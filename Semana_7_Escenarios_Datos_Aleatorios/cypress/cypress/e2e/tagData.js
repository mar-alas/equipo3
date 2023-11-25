const tag = {
    name: {
        name: '',
        limitMin: 1,
        limitMax: 190,
    },
    slug: {
        string: '',
        limitMin: 1,
        limitMax: 190,
    },
    description: {
        body: '',
        limitMin: 1,
        limitMax: 498,
    },
    metaData: {
        metaTitle: {
            title: '',
            limit: 191,
        },
        metaDescription: {
            description: '',
            limit: 500,
        }
  
    },
    xCard: {
        title: {
            title: '',
            limit: 70,
        },
        description: {
            description: '',
            limit: 125,
        }
    },
    facCard: {
        oggTitle: {
            title: '',
            limit: 100,
        },
        oggDescription: {
            description: '',
            limit: 65,
        }
    },
  };

  export default tag;