export const getToken = () => {
    return sessionStorage.getItem('token');
}

export const getProductClassification = (alias) => {
    let title;

    const arr = [
        {
            alias:"co-vua",
            title:"cờ vua"
        },
        {
            alias:"ca-ngua",
            title:"cá ngựa"
        },
        {
            alias:"co-tuong",
            title:"cờ tướng"
        },
        {
            alias:"xep-hinh",
            title:"xếp hình"
        },
        {
            alias:"ngoai-troi",
            title:"đồ chơi ngoài trời"
        },
        {
            alias:"khac",
            title:"khác"
        },
    ];

    for (let i = 0; i < arr.length; i++) {
        if (alias === arr[i].alias) {
            return arr[i].title;
        }
    }

    return title;
}