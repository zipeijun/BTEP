const Ready2CloneList = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    ['li', {
        beforeCopy(node) {
            if (node.querySelectorAll('p').length) {
                return void 0
            }
            return node
        }
    }],
    ['p', {
        afterCopy(node) {
            for (const img of node.querySelectorAll('img')) {
                img.remove()
            }
            return node
        }
    }]
]

const decodeTarget = (target) => {
    let name = ''
    let hook = {}
    if (Object.prototype.toString.call(target) === '[object String]') {
        name = target
        return { name, hook }
    }
    name = target[0]
    hook = target[1]
    return { name, hook }
}

const handleBeforeCopy = ({ hook, node }) => {
    let copy, temp
    if (hook.beforeCopy) {
        temp = hook.beforeCopy(node)
        if (temp) {
            copy = temp.cloneNode(true)
        }
    } else {
        copy = node.cloneNode(true)
    }
    if (copy) {
        copy.classList.add('the-clone')
        return copy
    }
    return void 0
}

const handleAfterCopy = ({ hook, copy }) => {
    if (hook.afterCopy) {
        copy = hook.afterCopy(copy)
    }
    return copy
}

const cloneNodes = (target) => {
    const { name, hook } = decodeTarget(target)
    document.querySelectorAll(name).forEach(node => {
        let copy = handleBeforeCopy({ hook, node })
        if (copy) {
            copy = handleAfterCopy({ hook, copy })
            node.parentElement.insertBefore(copy, node.nextElementSibling)
            node.setAttribute('translate', 'no')
        }
    })
}

Ready2CloneList.forEach(name => cloneNodes(name))
