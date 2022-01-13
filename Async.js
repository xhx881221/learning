function run(gen) {
    return new Promise((resolve, reject) => {
        var g = gen();

        function step(val) {
            try {
                var res = g.next(val);
            } catch(err) {
                return reject(err);
            }
            
            if (res.done) {
                return resolve(res.value);
            }
            Promise.resolve(res.value).then(
                val => {
                    step(val);
                },
                err => {
                    g.throw(err);
                }
            );
        }
        step();
    });
}

function* myGenerator() {
    console.log(yield Promise.resolve(1));
    console.log(yield Promise.resolve(2));
    console.log(yield Promise.resolve(3));
}

run(myGenerator);