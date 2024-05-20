exports.version = 1.2
exports.description = "Simple text editor"
exports.apiRequired = 8.65
exports.repo = "damienzonly/hfs-simple-editor"
exports.frontend_js = ['editor.js', 'main.js']

exports.config = {
    limitMB: {frontend: true, type: 'number', label: 'Limit MB', helperText: 'Disable edit on files greater than this limit', defaultValue: 1, min: 0},
}