{
    const r = HFS.React
    HFS.onEvent('fileMenu', ({entry}) => {
        if (entry.isFolder) return
        return {
            label: 'Edit',
            icon: 'edit',
            onClick() {
                HFS.dialogLib.newDialog({
                    Content() {
                        const [value, onValueChange] = r.useState('function add(a, b) {\n  return a + b;\n}')
                        return HFS.h(r.Fragment, null, HFS.h(Editor, {
                            value,
                            onValueChange,
                            style: {
                                minWidth: '40vw',
                                minHeight: '30vh',
                                resize: 'both'
                            },
                            highlight: () => value,
                        }), HFS.h('button', {style: {marginTop: 20}}, 'Save'))
                    }
                })
            }
        }
    })

}