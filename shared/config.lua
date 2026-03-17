return {

    interaction = 'target', -- target / textui

    cityhallpos = {

        {
            coords = vec3(-269.1226, -956.1489, 31.2231),

            blip = {
                enabled = true,
                sprite = 419,
                color = 0,
                scale = 0.5,
                label = 'City Hall'
            },

            ped = {
                model = 'u_f_y_spyactress',
                coords = vec4(-269.1226, -956.1489, 31.2231, 199.6557),
                scenario = 'WORLD_HUMAN_STAND_MOBILE'
            },

            licenses = {

                ['id_card'] = {
                    item = 'id_card',
                    label = 'ID Card',
                    cost = 50
                },

                ['driver_license'] = {
                    item = 'driver_license',
                    label = 'Driver License',
                    cost = 50
                }

            }

        }

    },

    employment = {

        jobs = {

            unemployed = {
                label = 'Civilian',
                description = 'You currently do not have a job.',
                image = 'nui://krs_cityhall/web/images/unemployed.png'
            },

            trucker = {
                label = 'Trucker',
                description = 'Deliver goods across the city.',
                image = 'nui://krs_cityhall/web/images/trucker.png'
            },

            taxi = {
                label = 'Taxi Driver',
                description = 'Transport citizens around Los Santos.',
                image = 'nui://krs_cityhall/web/images/taxi.png'
            },

            tow = {
                label = 'Tow Truck',
                description = 'Recover broken vehicles.',
                image = 'nui://krs_cityhall/web/images/tow.png'
            },

            reporter = {
                label = 'News Reporter',
                description = 'Report news across the city.',
                image = 'nui://krs_cityhall/web/images/reporter.png'
            },

            garbage = {
                label = 'Garbage Collector',
                description = 'Collect trash across the city.',
                image = 'nui://krs_cityhall/web/images/garbage.png'
            },

            bus = {
                label = 'Bus Driver',
                description = 'Drive citizens across Los Santos.',
                image = 'nui://krs_cityhall/web/images/bus.png'
            }

        }

    }

}