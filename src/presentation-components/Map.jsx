import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
	accessToken: "pk.eyJ1Ijoic21haWxnIiwiYSI6ImNqcWsxZ3IyMDA4ZXQ0MnBmM2g4aTM2YjEifQ.3brAgnVyCkQrY4Mz86CbNg"
});

const MapView = ({ markers, showMarkers, handleMarkerDrawer }) => {
	const standardMarkers = markers && markers.filter(m => m.category === 'standard');
	const optionalMarkers = markers && markers.filter(m => m.category === 'optional');

	return (
			<Map
				doubleClickZoom={false}
				center={[18.35644, 43.84864]}
				zoom={[13]}
				style="mapbox://styles/mapbox/streets-v9"
				containerStyle={{
					height: "100vh",
					width: "100vw"
				}}>
			<React.Fragment>
			<Layer
				type="circle"
				id="marker-standard"
				paint={{
					"circle-radius": showMarkers ? 12 : 0,
					"circle-color": "#ff5200",
					"circle-stroke-width": 1,
					"circle-stroke-color": "#fff",
					"circle-stroke-opacity": 1
				}}
			>
			{standardMarkers && standardMarkers.map(m => <Feature onClick={() => handleMarkerDrawer(m.id, m.alias)} key={m.id} coordinates={[m.lat, m.lon]} /> )}
			</Layer>
			
			<Layer
				type="circle"
				id="marker-optional"
				paint={{
					"circle-radius": showMarkers ? 12 : 0,
					"circle-color": "blue",
					"circle-stroke-width": 1,
					"circle-stroke-color": "#fff",
					"circle-stroke-opacity": 1
				}}
			>
				{optionalMarkers && optionalMarkers.map(m => <Feature onClick={() => handleMarkerDrawer(m.id, m.alias)} key={m.id} coordinates={[m.lat, m.lon]} />)}
			</Layer>
			</React.Fragment>
			</Map>
	);
}

export default MapView;