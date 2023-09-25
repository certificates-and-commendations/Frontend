import React, {useState} from 'react';
import Draggable from 'react-draggable';

function ElementFiles({ element, onDrag, positions, setPositions }) {

	return (
		<div className="element-files">
			{element.map((elem, index) => (
				<Draggable
					bounds="parent"
					position={positions[index]}
					onDrag={(e, { x, y }) => {
						const newPositions = [...positions];
						newPositions[index] = { x, y };
						setPositions(newPositions);
						onDrag(e, { x, y }, elem.id);
					}}
					key={elem.id}
				>
					<img
						src={elem.url}
						alt="Элемент"
						className="element-files__certificate"
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							width: '100px',
							height: '100px',
						}}
					/>
				</Draggable>
			))}
		</div>
	);
}


export default ElementFiles;
