{
    function escapeHtml(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    const limit = HFS.getPluginConfig()['limitMB'] * Math.pow(1024, 2)
    const r = HFS.React
    HFS.onEvent('fileMenu', ({ entry: ent }) => {
        const showCreateFile = ent.isFolder && ent.uri === location.pathname && HFS.state.props.can_upload
        if ((ent.isFolder && !showCreateFile) || !HFS.state.props.can_upload || ent?.s > limit) return
        const props = {
            div: { style: { marginTop: 10, display: 'flex', justifyContent: 'flex-end' } },
            label: { style: { marginBottom: 10, display: 'block' } },
            input: sf => ({ name: 'input', onChange(e) { sf(e.target.value) } }),
            button: (f, d) => ({ onClick: () => createFile(ent.uri, f, d) }),
            // support enter to submit
            form: (f, d) => ({
                onSubmit: (e) => {
                    e.preventDefault()
                    createFile(ent.uri, f, d)
                }
            })
        }
        let dialog
        const dialogDescriptor = showCreateFile ? {
            title: 'Create file',
            Content() {
                const [f, sf] = r.useState('')
                return HFS.h(r.Fragment, null,
                    HFS.h('form', props.form(f, dialog),
                        HFS.h('label', props.label, 'Enter file name'),
                        HFS.h('input', props.input(sf))
                    ),
                    HFS.h('div', props.div,
                        HFS.h('button', props.button(f, dialog), 'Create')
                    )
                )
            }
        } : {
            title: `Editing ${ent.name}`,
            Content() {
                const [value, change] = r.useState('')
                r.useEffect(() => {
                    fetch(ent.uri + '?dl', { cache: 'no-store' }).then(v => v.text()).then(change).catch(() => change(''))
                }, [])
                return HFS.h(r.Fragment, null, HFS.h(Editor, {
                    value,
                    onValueChange: change,
                    style: { minWidth: '40vw', minHeight: '30vh', resize: 'both' },
                    highlight: () => escapeHtml(value),
                }), HFS.h('button', { style: { marginTop: 20 }, onClick: save }, 'Save'))

                function save() {
                    fetch(ent.uri + '?existing=overwrite', { method: 'PUT', body: value }).then(res => {
                        if (!res.ok)
                            return HFS.dialogLib.alertDialog("Failed: " + res.statusText)
                        dialog.close()
                    })
                }
            }
        }
        return {
            label: showCreateFile ? 'Create file' : 'Edit',
            icon: showCreateFile ? 'file' : 'edit',
            onClick() {
                dialog = HFS.dialogLib.newDialog(dialogDescriptor)
            }
        }
    })

    async function createFile(path, filename, d) {
        if (!filename) return
        if (path === '/') path = ''
        const uri = `${path}/${filename}`
        // check if filename already exists, with fresh data instead of HFS.state.list
        const s = await HFS.apiCall('get_file_list', { uri: path })
        if (s.list.find(f => !f.isFolder && f.n === filename))
            if (s)
                return HFS.dialogLib.newDialog({
                    title: 'Conflict',
                    Content: () => HFS.h('div', null, 'File already exists, choose a different name')
                })
        return fetch(uri, { method: 'PUT', body: '' }).then(d.close).then(HFS.reloadList)
    }
}
