import React, { Component } from "react";
import CardList from "../compoments/CardList";
import Scroll from "../compoments/Scroll";
import SearchBox from "../compoments/SearchBox";
import './App.css';

/*
SearchBox kullanabilmek icin robots ve searchbox arasinda iliski kurmamiz gerekmekte
Bunu saglamak icin degisken bir veriyi yakalamamiz ve eslesitrmemiz gerekiyor
Degisken verileri proplar saglayamaz. Props sadece input alir ve o inputa karsilik bir output dondurur
Bu yuzden State kullanilir. State Propslarin parent blogudur, Objedir. State degisebilir
State clas ile ve clas icerisinde kullaniriz
this.state diyerek de belli ederiz ve normal bir obje gibi iliski kurulacak tanimlamalari gireriz
*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  onSearchChange = (event) => {
    // her degistirmek istedigimizde (update) this.setState kullan
    this.setState({ searchfield: event.target.value });
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }

  render() {
    const filteredRobots = this.state.robots.filter((robotlar) => {
      return robotlar.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    if (this.state.robots.length === 0) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="tc">
          <h1>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
