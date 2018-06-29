/* global ngapp, xelib */
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
    execute: (patchFile, helpers, settings, locals) => ({
        process: [{
            load: {
                signature: 'NPC_',
                filter: function(record) {
                    return xelib.GetFlag(record, 'ACBS\\Flags', 'Opposite Gender Anims');
                }
            },
            patch: function(record) {
                helpers.logMessage(`Disabling 'Opposite Gender Anims' for ${xelib.LongName(record)}`);
                xelib.SetFlag(record, 'ACBS\\Flags', 'Opposite Gender Anims', false); 
            }
        }]
    })
});