
import { useState } from 'react';
import GridCell from './GridCell';

interface GridEditorProps {
  gridType: '2x2' | '3x3';
  backgroundColor: string;
}

interface GridCellData {
  id: string;
  image: string | null;
}

const GridEditor: React.FC<GridEditorProps> = ({ gridType, backgroundColor }) => {
  const cellCount = gridType === '2x2' ? 4 : 9;
  
  const [gridData, setGridData] = useState<GridCellData[]>(
    Array.from({ length: cellCount }, (_, index) => ({
      id: `cell-${index}`,
      image: null,
    }))
  );

  const handleImageChange = (index: number, file: File | null) => {
    const newGridData = [...gridData];
    
    if (file === null) {
      newGridData[index] = { ...newGridData[index], image: null };
    } else {
      const imageUrl = URL.createObjectURL(file);
      newGridData[index] = { ...newGridData[index], image: imageUrl };
    }
    
    setGridData(newGridData);
  };

  // If grid type changes, adjust the grid cells
  if (gridData.length !== cellCount) {
    if (gridData.length < cellCount) {
      // Add new cells
      const newCells = Array.from({ length: cellCount - gridData.length }, (_, index) => ({
        id: `cell-${gridData.length + index}`,
        image: null,
      }));
      setGridData([...gridData, ...newCells]);
    } else {
      // Remove excess cells
      setGridData(gridData.slice(0, cellCount));
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div 
        className={`grid-container grid-${gridType} w-full aspect-square rounded-lg overflow-hidden shadow-md`} 
        style={{ backgroundColor }}
      >
        {gridData.map((cell, index) => (
          <GridCell
            key={cell.id}
            image={cell.image}
            onImageChange={(file) => handleImageChange(index, file)}
          />
        ))}
      </div>
    </div>
  );
};

export default GridEditor;
