registerPatcher({
    info: info,
    gameModes: [xelib.gmTES5, xelib.gmSSE],
    settings: {
        label: 'Opposite Animation Disabler',
        hide: true
    },
    getFilesToPatch: function(filenames) {
        return filenames;
    },
    execute: (patch, helpers, settings, locals) => ({
        initialize: function() {
            locals = {
                disabled: 0
            }
        },
        process: [{
            load: {
                signature: 'NPC_',
                filter: function(record) {
                    return xelib.GetFlag(record, 'ACBS\\Flags', 'Opposite Gender Anims');
                }
            },
            patch: function(record) {
                xelib.SetFlag(record, 'ACBS\\Flags', 'Opposite Gender Anims', false); 
                locals.disabled += 1;
            }
        }],
        finalize: function() {
            helpers.logMessage(`Disabled 'Opposite Gender Anims' for ${locals.disabled} records`);
        }
    })
});