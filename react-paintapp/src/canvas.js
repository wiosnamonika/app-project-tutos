import React, { Component } from 'react';
import { v4 } from 'uuid';

import Pusher from 'pusher-js';

class Canvas extends Component {
    constructor(props) {
        super(props);
        /* adding event */
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);

        this.pusher = new Pusher('b697624016cc53f7434c', {
            cluster: 'eu',
        });
    }

    isPainting = false;

    userStrokeStyle = '#80dfff';
    questStrokeStyle = '#F0C987';
    line = [];

    //v4 for creating unique id for each user
    userId = v4();
    prevPos = { offsetX: 0, offsetY: 0 };

    onMouseDown({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
    }

    onMouseMove({ nativeEvent }){
        if (this.isPainting) {
            const { offsetX, offsetY } = nativeEvent;
            const offSetData = { offsetX, offsetY };

            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
            };

            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        }
    }

    endPaintEvent() {
        if (this.isPainting) {
            this.isPainting = false;
            this.sendPaintData()
        }
    }
    paint(prevPos, currentPos, strokeStyle) {
        const { offsetX, offsetY } = currentPos;
        const { offsetX : x, offsetY: y } = prevPos;

        this.cx.beginPath();
        this.cx.strokeStyle = strokeStyle;

        //moving prevPos of mouse
        this.cx.moveTo(x,y);
        //draw line to the current pos
        this.cx.lineTo(offsetX, offsetY);
        //visualize
        this.cx.stroke();
        this.prevPos = { offsetX, offsetY };
    }
    async sendPaintData() {
        const body = {
            line: this.line,
            userId: this.userId,
        };

        //requests to the server
        const req = await fetch('http://localhost:4000/paint', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
        });
        const res = await req.json();
        this.line = [];
    }
    componentDidMount() {
        //set up prroperities of canvas
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.cx = this.canvas.getContext('2d');
        this.cx.lineJoin = 'round';
        this.cx.lineCap = 'round';
        this.cx.lineWidth = 5;

        const channel = this.pusher.subscribe('painting');
        channel.bind('draw', (data) => {
            const { userId,line } = data;
            if (userId !== this.userId) {
                line.forEach((position) => {
                    this.paint(position.start, position.stop, this.questStrokeStyle)
                });
            }
        });
    }

    render() {
        return(
            <canvas
                ref={ (ref) => (this.canvas = ref) }
                className = 'canvas-style'
                // style = {{ background: 'black' }}
                onMouseDown={ this.onMouseDown }
                onMouseLeave = { this.endPaintEvent }
                onMouseUp = { this.endPaintEvent }
                onMouseMove = { this.onMouseMove }
            />
        );
    }
}


export default Canvas;