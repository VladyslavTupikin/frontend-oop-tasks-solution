function task1() {
  class Movie {
    #name;
    #category;
    #startShow;

    constructor(name, category, startShow) {
      this.#name = name;
      this.#category = category;
      this.#startShow = startShow;
    }

    watchMovie() {
      return `I watch the movie ${this.#name}!`;
    }

    toString() {
      return `${this.#name} ${this.#category} ${this.#startShow}`;
    }

    get name() {
      return this.#name;
    }

    get category() {
      return this.#category;
    }
    get startShow() {
      return this.#startShow;
    }
  }

  const movie1 = new Movie("Titanic", "drama", 1997);
  const movie2 = new Movie("Troya", "historical", 2004);

  console.log(movie1.watchMovie());
  console.log(movie2.watchMovie());
}

function task2() {
  class Student {
    #fullName;
    #direction;

    constructor(fullName, direction) {
      this.#fullName = fullName;
      this.#direction = direction;
    }

    get fullName() {
      return this.#fullName;
    }

    get direction() {
      return this.#direction;
    }

    set direction(value) {
      this.#direction = new String(value);
    }

    toString() {
      return `${this.#fullName} ${this.#direction}`;
    }

    getFullName() {
      return this.#fullName;
    }

    nameIncludes(data) {
      if (typeof data === "string") {
        return this.#fullName.includes(data);
      }
    }

    static studentBuilder() {
      return new Student("Ihor Kohut", "qc");
    }
  }

  const stud1 = new Student("Ivan Petrenko", "web");
  const stud2 = new Student("Sergiy Koval", "python");
  const stud3 = Student.studentBuilder();

  console.log(stud1.toString());

  console.log(`Do we have Bobik? ${stud1.nameIncludes("Bobik")}`);
  console.log(`Do we have Bibizyan? ${stud1.nameIncludes("Bibizyan")}`);
}

function task3() {
  class Distributor {
    constructor() {
      this.products = {};
    }

    addProduct(id, name) {
      this.products[id] = name;
    }

    removeProduct(id) {
      delete this.products[id];
    }
  }

  const localDistributor = new Distributor();

  class MyProduct {
    constructor(name) {
      //your code
      //generate unique product id; define id and name fields

      this.name = name;
      this.id = Symbol(name);
    }

    distribute(distributor) {
      distributor.addProduct(this.id, this.name);
    }
  }

  const product1 = new MyProduct("butter");
  product1.distribute(localDistributor);
  console.log(localDistributor.products);

  new MyProduct("bread").distribute(localDistributor);
  new MyProduct("bread").distribute(localDistributor);
  console.log(localDistributor.products);

  localDistributor.removeProduct(product1.id);
  console.log(localDistributor.products);
}

function task4() {
  function getMin(arr) {
    const tmp = [...arr];
    tmp.sort((a, b) => a - b);

    return tmp;
  }
  console.log(getMin([12, 6, 22, 13, 7]));
}

function task6() {
  class Plane {
    #model;
    #fuelSupply;
    #fuelConsumption;

    constructor(model, fuelSupply, fuelConsumption) {
      this.#model = model;
      this.#fuelSupply = fuelSupply;
      this.#fuelConsumption = fuelConsumption;
    }

    calcFlightRange() {
      return (this.#fuelSupply / this.#fuelConsumption) * 100;
    }

    static showSortedByFlightRange(planesArray) {
      let tmp = [...planesArray];

      tmp.sort((a, b) => a.calcFlightRange() - b.calcFlightRange());

      tmp.forEach((element) => {
        console.log(`${element.model}: ${element.calcFlightRange()}`);
      });
    }

    get model() {
      return this.#model;
    }

    get fuelSupply() {
      return this.#fuelSupply;
    }

    get fuelConsumption() {
      return this.#fuelConsumption;
    }

    toString() {
      return `${this.#model} ${this.#fuelSupply} ${this.#fuelConsumption}`;
    }
  }

  class TransportPlane extends Plane {
    #cargo;
    #addTank;

    constructor(model, fuelSupply, fuelConsumption, cargo, addTank) {
      super(model, fuelSupply, fuelConsumption);
      this.#cargo = cargo;
      this.#addTank = addTank;
    }

    calcFlightRange() {
      return ((super.fuelSupply + this.#addTank) / super.fuelConsumption) * 100;
    }

    toString() {
      return `${super.toString()} ${this.#cargo} ${this.#addTank}`;
    }
  }

  class PassengerPlane extends Plane {
    #passengers;
    #refueling;

    constructor(model, fuelSupply, fuelConsumption, passengers, refueling) {
      super(model, fuelSupply, fuelConsumption);
      this.#passengers = passengers;
      this.#refueling = refueling;
    }

    calcFlightRange() {
      return (
        ((super.fuelSupply + this.#refueling) / super.fuelConsumption) * 100
      );
    }

    toString() {
      return `${super.toString()} ${this.#passengers} ${this.#refueling}`;
    }
  }

  class WarPlane extends Plane {
    #missiles;
    #aerodynamicsKoef;

    constructor(
      model,
      fuelSupply,
      fuelConsumption,
      missiles,
      aerodynamicsKoef,
    ) {
      super(model, fuelSupply, fuelConsumption);
      this.#missiles = missiles;
      this.#aerodynamicsKoef = aerodynamicsKoef;
    }

    calcFlightRange() {
      return (
        ((super.fuelSupply * this.#aerodynamicsKoef) / super.fuelConsumption) *
        100
      );
    }

    toString() {
      return `${super.toString()} ${this.#missiles} ${this.#aerodynamicsKoef}`;
    }
  }

  const plane1 = new TransportPlane("An-225 Mriya", 105000, 5000, 500, 300000);
  console.log(`${plane1.model}: ${plane1.calcFlightRange()}`);
  const plane2 = new PassengerPlane("Boeing-747", 193000, 2500, 410, 90000);
  console.log(`${plane2.model}: ${plane2.calcFlightRange()}`);
  const plane3 = new WarPlane("F-22 Raptor", 8200, 320, 20, 1.2);
  console.log(`${plane3.model}: ${plane3.calcFlightRange()}`);
  const planesArray = [plane1, plane2, plane3];
  console.log("Sorted range of planes:");
  Plane.showSortedByFlightRange(planesArray);

  // console.log(plane1.toString());
}

function task7() {
  const pizzaMenu = {
    SIZE_S: { param: "SIZE_S", price: 60, calorie: 300 },
    SIZE_M: { param: "SIZE_M", price: 90, calorie: 450 },
    SIZE_L: { param: "SIZE_L", price: 110, calorie: 600 },
    KIND_MEAT: { param: "KIND_MEAT", price: 55, calorie: 230 },
    KIND_FISH: { param: "KIND_FISH", price: 70, calorie: 150 },
    KIND_CHEESE: { param: "KIND_CHEESE", price: 50, calorie: 200 },
    KIND_VEGETARIAN: { param: "KIND_VEGETARIAN", price: 35, calorie: 50 },
    INGREDIENT_TOMATOES: {
      param: "INGREDIENT_TOMATOES",
      price: 15,
      calorie: 5,
    },
    INGREDIENT_PEPPER: { param: "INGREDIENT_PEPPER", price: 18, calorie: 5 },
    INGREDIENT_BACON: { param: "INGREDIENT_BACON", price: 25, calorie: 40 },
    INGREDIENT_OLIVES: { param: "INGREDIENT_OLIVES", price: 20, calorie: 0 },
  };

  const PizzaSizeVariants = ["SIZE_S", "SIZE_M", "SIZE_L"];
  const PizzaKindVariants = [
    "KIND_MEAT",
    "KIND_FISH",
    "KIND_CHEESE",
    "KIND_VEGETARIAN",
  ];
  const PizzaIngridientVariants = [
    "INGREDIENT_TOMATOES",
    "INGREDIENT_PEPPER",
    "INGREDIENT_BACON",
    "INGREDIENT_OLIVES",
  ];

  class PizzaTemplate {
    #param;
    #price;
    #calorie;

    constructor(pizzaMenu) {
      if (typeof pizzaMenu !== "object" || pizzaMenu === null) {
        throw new TypeError("Invalid type: pizzaMenu object expected.");
      }

      if (typeof pizzaMenu.param !== "string") {
        throw new TypeError(
          "Invalid type: pizzaMenu.param type string expected.",
        );
      }

      if (
        typeof pizzaMenu.price !== "number" ||
        typeof pizzaMenu.calorie !== "number"
      ) {
        throw new TypeError(
          "Invalid type: pizzaMenu.price / pizzaMenu.calorie type number expected.",
        );
      }

      if (pizzaMenu.price < 0 || pizzaMenu.calorie < 0) {
        throw new Error(
          `Invalid value: pizzaMenu.price and pizzaMenu.calorie must be positive value.`,
        );
      }

      this.#param = pizzaMenu.param;
      this.#price = pizzaMenu.price;
      this.#calorie = pizzaMenu.calorie;
    }

    toString() {
      return `${this.#param} ${this.#price} ${this.#calorie}`;
    }

    get param() {
      return this.#param;
    }

    get price() {
      return this.#price;
    }
    get calorie() {
      return this.#calorie;
    }
  }

  class PizzaSize extends PizzaTemplate {
    #size;

    constructor(pizzaMenuSize) {
      super(pizzaMenuSize);

      if (!PizzaSizeVariants.find((element) => element === super.param)) {
        throw new Error(`Invalid value: unavailable Pizza size ${super.param}`);
      }

      this.#size = super.param;
    }

    toString() {
      return `${this.#size} ${super.toString()}`;
    }

    get size() {
      return this.#size;
    }
  }

  class PizzaKind extends PizzaTemplate {
    #kind;

    constructor(pizzaMenuKind) {
      super(pizzaMenuKind);

      if (!PizzaKindVariants.find((element) => element === super.param)) {
        throw new Error(`Invalid value: unavailable Pizza kind ${super.param}`);
      }

      this.#kind = super.param;
    }

    toString() {
      return `${this.#kind} ${super.toString()}`;
    }

    get kind() {
      return this.#kind;
    }
  }

  class PizzaIngridient extends PizzaTemplate {
    #ingridient;

    constructor(pizzaMenuIngridient) {
      super(pizzaMenuIngridient);

      if (!PizzaIngridientVariants.find((element) => element === super.param)) {
        throw new Error(`Invalid value: unavailable Pizza kind ${super.param}`);
      }

      this.#ingridient = super.param;
    }

    toString() {
      return `${this.#ingridient} ${super.toString()}`;
    }

    get ingridient() {
      return this.#ingridient;
    }
  }

  class PizzaMaker {
    #pizzaSize;
    #pizzaKind;
    #pizzaIngridients = new Array();

    constructor(size, kind) {
      this.#pizzaSize = new PizzaSize(size);
      this.#pizzaKind = new PizzaKind(kind);
    }

    addIngredient(ingredient) {
      const newIngridient = new PizzaIngridient(ingredient);

      const isExist = this.#pizzaIngridients.find(
        (element) => element.ingridient === newIngridient.ingridient,
      );

      if (isExist) {
        console.log("Such an ingredient already exists!");
        return;
      }

      this.#pizzaIngridients.push(newIngridient);
      console.log(`${newIngridient.ingridient} has been added`);
    }

    deleteIngredient(ingredient) {
      const newIngridient = new PizzaIngridient(ingredient);

      const instanceToRemove = this.#pizzaIngridients.find(
        (element) => element.ingridient === newIngridient.ingridient,
      );

      const indexToRemove = this.#pizzaIngridients.indexOf(instanceToRemove);

      if (indexToRemove !== -1) {
        this.#pizzaIngridients.splice(indexToRemove, 1);
      }

      console.log(`${newIngridient.ingridient} has been deleted`);
    }

    getIngredients() {
      let ingridientList = [];

      this.#pizzaIngridients.forEach((element) => {
        const instance = {
          param: element.ingridient,
          price: element.price,
          calorie: element.calorie,
        };
        ingridientList.push(instance);
      });

      return ingridientList;
    }

    getSize() {
      return this.#pizzaSize.size;
    }

    getKind() {
      return this.#pizzaKind.kind;
    }

    calculatePrice() {
      let ingridientsPrice = 0;

      this.#pizzaIngridients.forEach(
        (element) => (ingridientsPrice += element.price),
      );

      return this.#pizzaSize.price + this.#pizzaKind.price + ingridientsPrice;
    }

    calculateCalories() {
      let ingridientsCalorie = 0;

      this.#pizzaIngridients.forEach(
        (element) => (ingridientsCalorie += element.calorie),
      );

      return (
        this.#pizzaSize.calorie + this.#pizzaKind.calorie + ingridientsCalorie
      );
    }
  }

  const pizza = new PizzaMaker(pizzaMenu.SIZE_M, pizzaMenu.KIND_MEAT);
  // console.log("Size:", pizza.getSize());
  // console.log("Kind:", pizza.getKind());
  // console.log("calculatePrice:", pizza.calculatePrice());
  // console.log("calculateCalories:", pizza.calculateCalories());
  // console.log("getIngredients:", pizza.getIngredients());
  // pizza.addIngredient(pizzaMenu.INGREDIENT_BACON);
  console.log("getIngredients:", pizza.getIngredients());
  pizza.addIngredient(pizzaMenu.INGREDIENT_BACON);
  pizza.addIngredient(pizzaMenu.INGREDIENT_TOMATOES);
  // pizza.addIngredient(pizzaMenu.INGREDIENT_BACON);
  console.log("getIngredients:", pizza.getIngredients());
  pizza.deleteIngredient(pizzaMenu.INGREDIENT_TOMATOES);
  console.log("getIngredients:", pizza.getIngredients());
}
task7();
