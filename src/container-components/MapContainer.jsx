import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from '../presentation-components/Map'
import { getMarkers, toggleMarkers } from '../actions/index';
import './MapContainer.css';
import { Button, Icon, Menu, Segment, Sidebar, Checkbox } from 'semantic-ui-react'

const mapStateToProps = (state) => {
	return {
		markers: state.markers.markersData,
		request: state.markers.request,
		showMarkers: state.markers.showMarkers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMarkers: () => dispatch(getMarkers()),
		toggleMarkers: () => dispatch(toggleMarkers())
	}
}

class MapContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			drawerMode: 'none',
			selection: undefined
		}
	}

	componentDidMount = () => {
		this.props.getMarkers();
	}

	toggleSidebarSettings = () => {
		if(this.state.drawerMode === 'settings')
		this.setState({ visible: !this.state.visible, selection: undefined });
		else this.setState({ drawerMode: 'settings', visible: true, selection: undefined });
	}

	handleShowMarkerCheckbox = () => {
		this.props.toggleMarkers();
	}

	handleMarkerDrawer = (id, alias) => {
		console.log('click')
		if (this.state.selection && id === this.state.selection.id) {
			console.log('IF')
			this.setState({ visible: false, selection: undefined })
		} 
		else {
			console.log('ELSE')
			this.setState({ visible: true, drawerMode: 'marker', selection: { id, alias } }, () => console.log(this.state));	
		} 
	}

	render() {
		const { visible, drawerMode, selection } = this.state;
		const { markers, showMarkers } = this.props;
		return (
			<div className="container">
				<Sidebar.Pushable as={Segment}>
					<Sidebar
						as={Menu}
						animation='overlay'
						icon='labeled'
						inverted
						onHide={this.handleSidebarHide}
						vertical
						visible={visible}
						width='wide'
					>
					{drawerMode === 'settings' && 
						<Menu.Item as='a'>
							<Segment style={{ margin: '.5em' }} compact>
								<Checkbox onChange={this.handleShowMarkerCheckbox} checked={showMarkers} label="Show markers" className="markers-slider" slider />
							</Segment>
						</Menu.Item>
					}

					{drawerMode === 'marker' && selection && 
						<Menu.Item as='a'>
							{"You selected marker: " + selection.alias}
						</Menu.Item>
					}
					</Sidebar>

					<Sidebar.Pusher>
						<Segment style={{ padding: 0}} basic>
							<div className="map-container">
								<Button secondary icon className="settings-button" onClick={this.toggleSidebarSettings}>
									<Icon name='settings' />
								</Button>
								<MapView markers={markers} showMarkers={showMarkers} handleMarkerDrawer={this.handleMarkerDrawer} />
							</div>
						</Segment>
					</Sidebar.Pusher>
        	</Sidebar.Pushable>
				
				
			</div>
		);
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);