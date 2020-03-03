import React, {Component} from 'react';
import{connect} from 'react-redux';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from'../components/ErrorBoundry';
import './App.css';

import {setSearchField,requestRobots} from'../Actions';

const mapStateToProps= state =>{
	return{
		searchField:state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPanding:state.requestRobots.isPanding,
		error:state.requestRobots.error
	}
}

const mapDispatcToProps =(dispatch) =>{

	return{
		onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
		onReqestRobots:()=>dispatch(requestRobots())
 }
}

class App extends Component {
	
	componentDidMount(){ 
		this.props.onReqestRobots();

	}
	
	render(){
	        const {searchField,onSearchChange,robots,isPanding}=this.props;
			const filteredRobots =robots.filter(robot =>{
	 		return robot.name.toLowerCase().includes(searchField.toLowerCase());
	 	}	)
	return isPanding ? 
		<h1>loading</h1>:
		(
     <div className='tc'>
		<h1 className='f1 '>RoboFriends</h1>
		<SearchBox searchChange={onSearchChange} />
		<Scroll>
		<ErrorBoundry>
		<CardList robots={filteredRobots}/>
		</ErrorBoundry>
		</Scroll>
	</div>
    );
   }
 }

export default connect(mapStateToProps,mapDispatcToProps)(App);