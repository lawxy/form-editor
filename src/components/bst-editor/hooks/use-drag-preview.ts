import { useEffect } from "react"
import type { ConnectDragPreview } from 'react-dnd'

export const useDragPreview:(text: string,connectDragPreview: ConnectDragPreview) => void = 
(text, connectDragPreview) => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 50;
    const ctx = canvas.getContext('2d') as any;
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, 100, 50);

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(text, 25, 30);

    const img = new Image();
    img.src = canvas.toDataURL();
    img.onload = () => {
      connectDragPreview(img);
    };
  }, [text, connectDragPreview])
}