exports.version = 1.4
exports.description = "Simple text editor"
exports.apiRequired = 8.65
exports.repo = "damienzonly/hfs-simple-editor"
exports.frontend_js = ['editor.js', 'main.js']
exports.preview = ["https://github.com/damienzonly/hfs-simple-editor/assets/38798780/a05529b6-2c88-4515-a21e-ec549466bc26", "https://github.com/damienzonly/hfs-simple-editor/assets/38798780/8dd24d16-5bd8-4796-a4af-f69b021ef75c", "https://github.com/damienzonly/hfs-simple-editor/assets/38798780/2d009f48-74ad-49a0-8d2a-1136839d9cd1", "https://github.com/damienzonly/hfs-simple-editor/assets/38798780/8c386e27-5726-4219-a6f5-27c8371da694"]

exports.config = {
    limitMB: {frontend: true, type: 'number', label: 'Limit MB', helperText: 'Disable edit on files greater than this limit', defaultValue: 1, min: 0},
}