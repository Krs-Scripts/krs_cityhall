local shared = require 'shared.config'

---@param coords vector3
---@return number
local function getClosestCenter(coords)
    local closest = 1
    local distance = #(coords - shared.cityhallpos[1].coords)

    for i = 2, #shared.cityhallpos do
        local center = shared.cityhallpos[i]
        local dist = #(coords - center.coords)

        if dist < distance then
            closest = i
            distance = dist
        end
    end

    return closest
end

---@param source number
---@param job string
---@return boolean
local function distanceCheck(source, job)
    local ped = GetPlayerPed(source)
    local coords = GetEntityCoords(ped)

    local closest = getClosestCenter(coords)
    local centerCoords = shared.cityhallpos[closest].coords

    if #(coords - centerCoords) > 20.0 then
        return false
    end

    if not shared.employment.jobs[job] then
        return false
    end

    return true
end

---@param source number
---@param item string
---@param hall number
---@return boolean
lib.callback.register('krs_cityhall:server:requestId', function(source, item, hall)
    local player = exports.qbx_core:GetPlayer(source)
    if not player then return false end

    local center = shared.cityhallpos[hall]
    if not center then
        exports.qbx_core:Notify(source, 'cityhall not configured', 'error')
        return false
    end

    local license = center.licenses[item]
    if not license then
        exports.qbx_core:Notify(source, 'License configuration missing', 'error')
        return false
    end

    local itemCount = exports.ox_inventory:Search(source, 'count', license.item)

    if itemCount and itemCount > 0 then
        exports.qbx_core:Notify(source, 'You already own this license', 'error')
        return false
    end

    local success = player.Functions.RemoveMoney('cash', license.cost)

    if not success then
        exports.qbx_core:Notify(source, 'Not enough cash', 'error')
        return false
    end

    exports.qbx_idcard:CreateMetaLicense(source, license.item)

    exports.qbx_core:Notify(source, ('You obtained: %s'):format(license.label), 'success')

    return true
end)

---@param source number
---@param job string
lib.callback.register('krs_cityhall:server:setJob', function(source, job)
    local player = exports.qbx_core:GetPlayer(source)
    if not player then return end

    if not distanceCheck(source, job) then
        lib.print.warn(('Possible exploit attempt from %s'):format(source))
        return
    end

    player.Functions.SetJob(job, 0)

    exports.qbx_core:Notify(source, 'New job assigned!', 'success')
end)