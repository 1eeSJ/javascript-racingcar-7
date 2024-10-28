import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import carNameSplit from "../utils/carNameSplit.js";
import Car from "../model/Car.js";

class Controller {
    #inputView;
    #outputView;
    car

    constructor() {
        this.#inputView = new InputView();
        this.#outputView = new OutputView();
        this.car = [];
    }

    settingCar(nameArray) {
      for (const carName of nameArray) {
        this.car.push(new Car(carName));
      }
    }

    moveCar() {
      for (let car of this.car) {
        car.move();
      }
    }

    async playRacingCar() {
      const [carNameData, numberOfAttemptsData] = await this.#inputView.readInput();
      const carNameArray = carNameSplit(carNameData);

      this.settingCar(carNameArray);

      this.#outputView.printResultPrefix();

      for (let attempts = 0; attempts < numberOfAttemptsData; attempts++) {
        this.moveCar();
        this.#outputView.printResult(this.car);
      }
    }
}

export default Controller;