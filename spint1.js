function task1() {
  const arrayOrig = [12, 6, 22, 0, -8];

  function getModifiedArray(array) {
    let tmp = array.slice();

    tmp.shift();
    tmp.unshift("Start");
    tmp.pop();
    tmp.push("End");

    return tmp;
  }

  console.log(getModifiedArray(arrayOrig));
}

function task2() {
  const dataArr = [-1, 2, 4, 0, 55, -12, 3, 45];
  const dataVal = 11;
  const data = "greater";

  const filterNums = (arrInt, valInt = 0, ineqality = "greater") => {
    const ineqalityLess = "less";
    const tmpArr = arrInt.slice();

    if (ineqality === ineqalityLess) {
      return tmpArr.filter((value) => value < valInt);
    } else {
      return tmpArr.filter((value) => value > valInt);
    }
  };

  console.log(filterNums(dataArr, dataVal, data));
}

function task3() {
  const maxInterv = (...args) => {
    let prev = 0;
    let fin = new Array();

    const calc = args.forEach((it) => {
      if (args.length < 2) fin.push(0);

      if (prev > 0) fin.push(Math.abs(prev - it));
      prev = it;
    });

    return Math.max(...fin);
  };

  console.log(maxInterv(3, 5, 2, 7));
  console.log(maxInterv(3, 5, 2, 7, 11, 0, -2));
  console.log(maxInterv(3, 5));
  console.log(maxInterv(3));
}

function task4() {
  const sumOfLen = (...args) => {
    if (args.length === 0) return 0;

    let sum = 0;
    const length = args.forEach((it) => {
      if (typeof it !== "string") return;
      sum += it.length;
    });

    return sum;
  };

  console.log(sumOfLen("hello", "hi")); //7
  console.log(sumOfLen("hi")); //2
  console.log(sumOfLen()); //0
  console.log(sumOfLen("hello", "hi", "my name", "is")); //16
}

function task5() {
  const arr1 = [12, "User01", 22, true, -8];
  const arr2 = ["Index", 6, null, 15];

  function combineArray(arr1, arr2) {
    let result = new Array();

    const combinedArr = [...arr1, ...arr2];

    combinedArr.forEach((it) => {
      if (typeof it === "number") result.push(it);
    });

    return result;
  }

  console.log(combineArray(arr1, arr2));
}

function task6() {
  function longestLogin(loginList) {
    let longest = "";

    loginList.forEach((it) => {
      if (it.length >= longest.length) longest = it;
    });

    return longest;
  }

  console.log(longestLogin(["serg22", "tester_2", "Prokopenko", "guest"]));
  console.log(longestLogin(["user1", "user2", "333", "user4", "aa"]));
}

function task7() {
  const dataArr = [1, 2, 3, 4, 5];
  function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
  }

  function processArray(arr, func) {
    let tmpArr = new Array();

    arr.forEach((it) => {
      tmpArr.push(func(it));
    });

    return tmpArr;
  }

  console.log(processArray(dataArr, factorial));
}

function task8() {
  function overloadedFunc(
    arg1 = [1, 2, 3],
    arg2 = 2,
    defaultFunc = (a, b) => {
      if (Array.isArray(a)) {
        return a.map((it) => it * b);
      } else {
        return a * b;
      }
    },
  ) {
    return defaultFunc(arg1, arg2);
  }

  console.log(overloadedFunc());
  console.log(overloadedFunc([2, 4, 6, 8]));
}
task8();
