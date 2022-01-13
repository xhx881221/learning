/**
* 飞入购物车，轨迹点绘制
* @param {Array} startPoint 起点clientX, clientY值 (必要) 
* @param {Array} endPoint   终点clientX, clientY值 (必要)
* @param {number} point     点数          (必要) 
* @param {number} h         抛物线向上高度(上抛运动)  (可选)
* @param {number} hclientX  当存在h情况下，达到最高点时候的clientX值
* @return {Array}  [ left ,top ] 值组成的数组
*/
function flycart(startPoint, endPoint, point, h = 0, hclientX) {
    //设置startPoint为(0,0)点, 此抛物线经过(0,0)点, 可以推到出模型关系式 y =  ax^2 + bx 或者 y = ax^2
    //1 当存在h的情况, 抛物线会y轴向上偏移 h, 此时的关系式 y = ax^2 + bx
    //2 当不存在h的情况, 抛物线startPoint为顶点, 此时关系式 y = ax^2

    //参数校验
    function ValiditParameter() {
        let isOkey = true;
        if (Array.isArray(startPoint) && startPoint.length !== 2) {
            isOkey = false;
        }
        if (Array.isArray(endPoint) && endPoint.length !== 2) {
            isOkey = false;
        }
        if (point.constructor !== Number) {
            isOkey = false;
        }
        return isOkey;
    }

    if (!ValiditParameter()) {
        return [];
    }

    /* A点横坐标 */
    const xA = 0;
    /* A点纵坐标 */
    const yA = 0;
    /* x轴偏移量 */
    const offsetX = startPoint[0];
    /* y轴偏移量 */
    const offsetY = startPoint[1];
    /* B点横坐标 */
    const xB = endPoint[0] - offsetX;
    /* B纵坐标 */
    const yB = endPoint[1] - offsetY;

    /* 根据B点坐标和最大高度h求系数a,b 参数*/
    let b = 0;
    let a = 0;

    function handleComputer() {
        if (h < 10) {
            a = yB / Math.pow(xB, 2);
        } else {
            h = -h;
            const effectMaHx = hclientX && Math.abs(hclientX - offsetX) > 0 && Math.abs(hclientX - offsetX) < Math.abs(xB);
            let maxHx = effectMaHx ? (hclientX - offsetX) : (xB + xA) / 2;
            a = ((yB / xB) - (h / maxHx)) / (xB - maxHx);
            b = (yB - a * Math.pow(xB, 2)) / xB;
        }
    }

    const travelList = [];
    const averageY = (yB - yA) / point;
    const averageX = (xB - xA) / point;

    function handerLinearMotion(type) {
        if (type === 'X') {
            for (let i = 1; i <= point; i++) {
                travelList.push([offsetX, i * averageY + offsetY]);
            }
        } else {
            for (let i = 1; i <= point; i++) {
                travelList.push([offsetX + i * averageX, offsetY]);
            }
        }
        return travelList;
    }

    /* 当 xB的绝对值小于10的情况，我们看作Y轴直线运功    */
    if (Math.abs(xB) < 10) {
        return handerLinearMotion('X');
    }
    /*当 yB的绝对值小于10的情况，我们看作x轴直线运功  */
    if (Math.abs(yB) < 10) {
        return handerLinearMotion('Y');
    }

    handleComputer();
    for (let i = 1; i <= point; i++) {
        const currentX = averageX * i;
        const currentY = a * Math.pow(currentX, 2) + b * currentX;
        travelList.push([currentX + offsetX, currentY + offsetY]);
    }

    return travelList;
}

export default flycart;