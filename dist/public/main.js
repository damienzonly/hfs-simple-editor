{
    const r = HFS.React
    HFS.onEvent('fileMenu', ({ entry: ent }) => {
        if (ent.isFolder) return
        return {
            label: 'Edit',
            icon: 'edit',
            onClick() {
                HFS.dialogLib.newDialog({
                    Content() {
                        const [value, change] = r.useState('')
                        r.useEffect(() => {
                            fetch(ent.uri + '?dl').then(v => v.text()).then(change).catch(() => change(''))
                        }, [])

                        function save() {
                            return fetch(ent.uri, { method: 'PUT', body: value })
                        }

                        return HFS.h(r.Fragment, null, HFS.h(Editor, {
                            value,
                            onValueChange: change,
                            style: { minWidth: '40vw', minHeight: '30vh', resize: 'both' },
                            highlight: () => value,
                        }), HFS.h('button', { style: { marginTop: 20 }, onClick: save }, 'Save'))
                    }
                })
            }
        }
    })

}