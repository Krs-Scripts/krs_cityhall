local shared = require 'shared.config'

local positions = {}
local currentHall = nil

--- The UI City Hall opens
---@param index number
local function openCityHall(index)
    currentHall = index

    local jobs = {}

    for job, data in pairs(shared.employment.jobs) do
        jobs[#jobs + 1] = {
            id = job,
            name = data.label,
            description = data.description,
            image = data.image
        }
    end

    SetNuiFocus(true, true)
    TriggerScreenblurFadeIn(0)
    SendNUIMessage({
        action = 'openCityHall',
        jobs = jobs
    })
end

--- Close UI
local function closeCityHall()
    TriggerScreenblurFadeOut(0)
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'closeCityHall'
    })
end

--- When you enter the zone
---@param self table
local function onEnter(self)

    if self.ped and DoesEntityExist(self.ped) then return end

    local pedData = self.cityhall.ped

    lib.requestModel(pedData.model)

    local ped = CreatePed(
        0,
        pedData.model,
        pedData.coords.x,
        pedData.coords.y,
        pedData.coords.z - 1.0,
        pedData.coords.w,
        false,
        false
    )

    FreezeEntityPosition(ped, true)
    SetEntityInvincible(ped, true)
    SetBlockingOfNonTemporaryEvents(ped, true)
    SetPedDiesWhenInjured(ped, false)
    SetPedCanRagdoll(ped, false)
    TaskStartScenarioInPlace(ped, pedData.scenario, 0, true)

    self.ped = ped

    if shared.interaction == 'target' then
        exports.ox_target:addLocalEntity(ped, {
            {
                name = "cityhall_ped_" .. ped,
                icon = 'fa-solid fa-briefcase',
                label = 'Choose a Job',
                onSelect = function()
                    openCityHall(self.index)
                end
            }
        })
    end

    SetModelAsNoLongerNeeded(pedData.model)
end

--- When you leave the area
---@param self table
local function onExit(self)

    lib.hideTextUI()

    if self.ped and DoesEntityExist(self.ped) then

        if shared.interaction == 'target' then
            exports.ox_target:removeLocalEntity(self.ped)
        end

        DeletePed(self.ped)
        self.ped = nil
    end
end

--- Loop near the area
---@param self table
local function nearby(self)

    if shared.interaction ~= 'textui' then return end

    if self.currentDistance < 2.0 then

        lib.showTextUI('[E] Open City Hall', {
            position = "top-center",
            icon = 'briefcase'
        })

        if IsControlJustPressed(0, 38) then
            openCityHall(self.index)
        end

    else
        lib.hideTextUI()
    end
end

--- Creation of City Hall
for i = 1, #shared.cityhallpos do

    local cfg = shared.cityhallpos[i]

    if cfg.blip and cfg.blip.enabled then
        local blip = AddBlipForCoord(cfg.coords.x, cfg.coords.y, cfg.coords.z)
        SetBlipSprite(blip, cfg.blip.sprite)
        SetBlipDisplay(blip, 4)
        SetBlipScale(blip, cfg.blip.scale)
        SetBlipColour(blip, cfg.blip.color)
        SetBlipAsShortRange(blip, true)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString(cfg.blip.label)
        EndTextCommandSetBlipName(blip)
    end

    positions[i] = lib.points.new({
        coords = cfg.coords,
        distance = 5.0,
        cityhall = cfg,
        index = i,
        onEnter = onEnter,
        onExit = onExit,
        nearby = nearby
    })
end

---@param item string
local function requestLicense(item)
    if not currentHall then return end
    lib.callback.await('krs_cityhall:server:requestId', false, item, currentHall)
end

RegisterNUICallback('closeCityHall', function(_, cb)
    closeCityHall()
    cb({})
end)

RegisterNUICallback('selectJob', function(data, cb)
    closeCityHall()
    lib.callback.await('krs_cityhall:server:setJob', false, data.job)
    cb({})
end)

RegisterNUICallback('selectID', function(_, cb)
    closeCityHall()
    requestLicense('id_card')
    cb({})
end)

RegisterNUICallback('selectDrive', function(_, cb)
    closeCityHall()
    requestLicense('driver_license')
    cb({})
end)