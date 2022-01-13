registerLayout('center', class {
    //需要获取相应值的css属性
    static inputProperties = ['line-height', 'text-align'];
    //必须
    async intrinsicSizes(children, edges, styleMap) {};
    async layout(children, edges, constraints, styleMap, breakToken) {
        //获取外部css属性值，行高和对齐方式
        let lineHeight = styleMap.get('line-height').value;
        let textAlign = styleMap.get('text-align').value;
        //返回所有子元素的内容长度数据
        const childrenSizes = await Promise.all(children.map((child) => {
            return child.intrinsicSizes();
        }));
        //求得最大内容宽度，对求需求
        const maxContentSize = childrenSizes.reduce((max, childSizes) => {
            return Math.max(max, childSizes.maxContentSize);
        }, 0) + edges.inline;
        //下面这四个const语句是固定且必要的
        const availableInlineSize = constraints.fixedInlineSize - edges.inline;
        const availableBlockSize = constraints.fixedBlockSize ? constraints.fixedBlockSize - edges.block : lineHeight;
        const childConstraints = { availableInlineSize, availableBlockSize };
        const childFragments = await Promise.all(children.map((child) => {
            return child.layoutNextFragment(childConstraints);
        }));
        //垂直偏移的其实距离
        let blockOffset = edges.blockStart;
        //设置每一个子元素的垂直偏移大小
        childFragments.forEach((fragment, index) => {
            //设置当前子元素的偏移大小
            fragment.inlineOffset = Math.max(0, availableInlineSize - maxContentSize) / 2;
            //右对齐需要增加最大内容尺寸的偏差值
            if (textAlign == 'right' || textAlign == 'end') {
                fragment.inlineOffset += (maxContentSize - childrenSizes[index].maxContentSize);
            }
            // 设置当前子元素的垂直偏移大小
            fragment.blockOffset = blockOffset;
            // 偏移递增
            blockOffset += lineHeight;
        });
        // 最终容器元素的高度大小
        const autoBlockSize = blockOffset + edges.blockEnd;

        return {
            autoBlockSize,
            childFragments,
        };
    }
});