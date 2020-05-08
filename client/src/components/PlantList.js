import React, { Component } from "react";
import axios from "axios";
import Search from '../components/Search'


export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(){
    super()
    this.state = {
      plants: [],
      searchTerm: '',
      newPlants: [],
      searchActive: false
    }
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount(){
    axios.get(`http://localhost:3333/plants`)
      .then( response => {
        this.setState({plants: response.data.plantsData})
      })
      .catch(error => {console.log(error);
      })
  }

  searchHandler = e => {
    this.setState({searchTerm: e.target.value})
  }
  searchSubmit = e => {
    e.preventDefault()

    this.setState({
      newPlants: this.state.plants.filter( p => {
        return p.name.includes(this.state.searchTerm)
      })
    })
    this.setState({searchActive: true})
  }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    if (this.state.searchActive === false){
      return (
        <main className="plant-list">
          <Search newPlants={this.state.newPlants} searchActive={this.state.searchActive} searchHandler={this.searchHandler} searchSubmit={this.searchSubmit} searchTerm={this.searchTerm}/>
          {this.state?.plants?.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      );
    } else if (this.state.searchActive === true){
      return (
        <main className="plant-list">
          <Search newPlants={this.state.newPlants} searchActive={this.state.searchActive} searchHandler={this.searchHandler} searchSubmit={this.searchSubmit} searchTerm={this.searchTerm}/>
          {this.state?.newPlants?.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      );
    }
  }
}
