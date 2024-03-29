{
    const limit = HFS.getPluginConfig()['limitMB']*Math.pow(1024, 2)
    const r = HFS.React
    HFS.onEvent('fileMenu', ({ entry: ent }) => {
        if (ent.isFolder || !HFS.state.props.can_upload || ent?.s > limit) return
        return {
            label: 'Edit',
            icon: 'edit',
            onClick() {
                const dialog = HFS.dialogLib.newDialog({
                    Content() {
                        const [value, change] = r.useState('')
                        r.useEffect(() => {
                            fetch(ent.uri + '?dl').then(v => v.text()).then(change).catch(() => change(''))
                        }, [])

                        function save() {
                            fetch(ent.uri, { method: 'PUT', body: value }).then(dialog.close)
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