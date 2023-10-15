import React from 'react';
import Draggable from 'react-draggable';

function ElementFiles({
	element,
	onDrag,
	positions,
	setPositions,
	updateElementPosition,
}) {
	return (
		<>
			{element.map((elem, index) => (
				<Draggable
					bounds="parent"
					position={positions[index]}
					onDrag={(e, { x, y }) => {
						const newPositions = [...positions];
						newPositions[index] = { x, y };
						setPositions(newPositions);
						updateElementPosition(elem.id, { x, y });
					}}
					key={elem.id}
				>
					<button
						className="element-files__certificate-btn"
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							width: '100px',
						}}
					>
						<img
							src={elem.url}
							alt="Элемент"
							className="element-files__certificate-img"
						/>
					</button>
				</Draggable>
			))}
		</>
	);
}

export default ElementFiles;
