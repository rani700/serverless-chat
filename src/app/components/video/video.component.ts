import { Component, OnInit } from '@angular/core';
declare var Peer: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor() { }

  peer:any;
  mypeerid:any;
  ownVideo:any;
  isconnected:boolean = false;

  ngOnInit() {
    navigator.getUserMedia({video: true, audio: true}, (stream)=>{
      // this.ownVideo = stream;
      document.querySelectorAll('video')[0].srcObject = stream
      document.querySelectorAll('video')[0].muted = true
    }, ()=>{});
  	this.peer = new Peer();
  	var $this = this;
  	this.peer.on('open', function(id) {
  	  console.log('My peer ID is: ' + id);
  	  $this.mypeerid = id;
  	});

  	this.peer.on('call', function(call) {
	  navigator.getUserMedia({video: true, audio: true}, function(stream) {
	  	document.querySelectorAll('video')[0].srcObject = stream
	  	document.querySelectorAll('video')[0].muted = true
	    call.answer(stream); // Answer the call with an A/V stream.
	    call.on('stream', function(remoteStream) {
	    	console.log(remoteStream)
	    	document.querySelectorAll('video')[1].srcObject = remoteStream
        $this.isconnected = true;
	      // Show stream in some video/canvas element.
	    });
	  }, function(err) {
	    console.log('Failed to get local stream' ,err);
	  });
	});


  // 	navigator.getUserMedia({video: true, audio: true}, (stream)=>{
  // 		// this.ownVideo = stream;
  // 		document.querySelector('video').srcObject = stream
  // 		var call = this.peer.call('another-peers-id', stream);
		// call.on('stream', function(remoteStream) {
	 //    	console.log(remoteStream)
		// });
  // 		console.log(stream)
  // 	}, (error)=>{
  // 		console.log(error)
  // 	})
  }


  startCall(peerId){
    let $this = this;
  	navigator.getUserMedia({video: true, audio: true}, (stream)=>{
  		// this.ownVideo = stream;
  		document.querySelectorAll('video')[0].srcObject = stream
  		document.querySelectorAll('video')[0].muted = true
  		var call = this.peer.call(peerId, stream);
		call.on('stream', function(remoteStream) {
	    	console.log(remoteStream)
	    	document.querySelectorAll('video')[1].srcObject = remoteStream
        $this.isconnected = true;
		});
  	}, (error)=>{
  		console.log(error)
  	})
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
