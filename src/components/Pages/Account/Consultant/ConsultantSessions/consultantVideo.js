import React, { useEffect, useState, useRef, ReactDOM } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import classes from "./consultantVideo.module.css";
import { Form, Col, Button, Row } from "react-bootstrap";
// import ReactDOM from "react-dom";

function ConsultantVideo() {
	const [joined, setJoined] = useState(false);

	const [channelName, setChannelName] = useState("");
	const [client, setClient] = useState(null);
	const [localAudioTrack, setLocalAudioTrack] = useState(null);
	const [localVideoTrack, setLocalVideoTrack] = useState(null);
	const [remoteVideoTrack, setRemoteVideoTrack] = useState([]);

	// const [rt]
	const [RTC, setRTC] = useState({
		// For the local client
		client: null,
		// For the local audio and video tracks
		localAudioTrack: null,
		localVideoTrack: null,
	});

	const channelRef = useRef("");
	const remoteRef = useRef("");
	const leaveRef = useRef("");

	useEffect(() => {}, [channelName, client]);

	console.log(remoteVideoTrack);
	console.log(
		process.env.REACT_APP_AGORA_CERT,
		`this is the token value for the agora process env`
	);

	const options = {
		// Pass your app ID here
		appId: process.env.REACT_APP_AGORA_ID,
		// appId: "0fb01569f39e4cc7b44fc0b0be4c6c5d",
		// Pass a token if your project enables the App Certificate
		token: process.env.REACT_APP_AGORA_CERT,
	};

	useEffect(() => {
		const handleUserLeft = (user) => {
			// Get the dynamically created DIV container
			const playerContainer = document.getElementById(user.uid);
			// console.log(playerContainer);
			// Destroy the container
			if (playerContainer) {
				playerContainer.remove();
			}
		};
		const handleUserJoined = async (user, mediaType) => {
			console.log(mediaType, `JOINNEDDD HEEREEEEEE`);
			// Subscribe to a remote user
			await client.subscribe(user, mediaType);
			console.log("subscribe success", mediaType);

			// console.log(user);

			if (mediaType === "video" || mediaType === "all") {
				// Get `RemoteVideoTrack` in the `user` object.
				const remoteVideoTrack = user.videoTrack;
				setRemoteVideoTrack(remoteVideoTrack);
				console.log(remoteVideoTrack, `41`);

				// Dynamically create a container in the form of a DIV element for playing the remote video track.

				// const PlayerContainer = React.createElement("div", {
				// 	id: user.uid,
				// 	// className: `${classes.video}`,
				// });

				// const ui = React.createElement("div", {
				// 	id: user.uid,
				// 	className: "myClass",
				// });

				const newNode = document.createElement("div");
				newNode.id = user.uid;
				newNode.classList.add(`${classes.video}`);
				// const PlayerContainer = React.createElement(App);

				// console.log(PlayerContainer);
				remoteRef.current.appendChild(newNode);
				// ReactDOM.render(
				// 	PlayerContainer,
				// 	document.getElementById("remote-stream")
				// );
				// const videoBox = document.getElementById("remote-stream");
				// videoBox.appendChild(PlayerContainer);
				console.log(user, `this is the user that will display`);
				user.videoTrack.play(`${user.uid}`);
			}

			if (mediaType === "audio" || mediaType === "all") {
				// Get `RemoteAudioTrack` in the `user` object.
				const remoteAudioTrack = user.audioTrack;
				// Play the audio track. Do not need to pass any DOM element
				remoteAudioTrack.play();
			}
		};
		if (client !== null) {
			console.log(`check chek chekc`);
			client.on("user-published", handleUserJoined);

			client.on("user-unpublished", handleUserLeft);
		}

		// return () => {
		// 	if (client) {
		// 		client.off("user-published", handleUserJoined);
		// 		client.off("user-unpublished", handleUserLeft);
		// 		client
		// 			.unpublish([localAudioTrack, localVideoTrack])
		// 			.then(() => client.leave());
		// 	}
		// };
	}, [client]);

	async function handleLeave() {
		try {
			const localContainer = document.getElementById("local-stream");

			localAudioTrack.close();
			localVideoTrack.close();

			setJoined(false);
			localContainer.textContent = "";

			// Traverse all remote users
			client.remoteUsers.forEach((user) => {
				// Destroy the dynamically created DIV container
				const playerContainer = document.getElementById(user.uid);
				playerContainer && playerContainer.remove();
			});

			// Leave the channel
			await client.leave();
		} catch (err) {
			console.error(err);
		}
	}

	async function handleJoinStream(e) {
		const newClient = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
		setClient(newClient);
		try {
			if (channelRef.current.value === "") {
				return console.log("Please Enter Channel Name");
			}

			setJoined(true);

			console.log(options.appId, `this is the appId`);

			const uid = await newClient.join(
				options.appId,
				channelName,
				options.token,
				null
			);

			console.log(options.appId, uid, `this is the appId and the uid`);

			const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
			setLocalAudioTrack(localAudioTrack);
			// Create a video track from the video captured by a camera
			const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
			setLocalVideoTrack(localVideoTrack);
			await newClient.publish([localAudioTrack, localVideoTrack]);

			// Play localStream
			localVideoTrack.play("local-stream");
		} catch (err) {
			console.error(err, `this is the error generated`);
		}
	}

	return (
		<div>
			{joined ? (
				<div>
					Room: {channelName}
					<div className={classes.streamCont}>
						<div id="local-stream" className={classes.video}></div>
						<div
							id="remote-stream"
							ref={remoteRef}
							className={classes.video}
						></div>
					</div>
					<Button
						type="button"
						ref={leaveRef}
						// value="Leave"
						onClick={handleLeave}
						disabled={joined ? false : true}
					>
						Leave meeting
					</Button>
				</div>
			) : (
				<div className="container">
					<Form.Group>
						<Form.Label
							type="text"
							ref={channelRef}
							id="channel"
							placeholder="Enter Channel name"
						>
							Enter Channel name
						</Form.Label>
						<Form.Control
							type="text"
							placeholder="channel Name"
							id="name"
							// name="name"
							onChange={(e) => setChannelName(e.target.value)}
							//   value={name}
							required
						/>
						<Button
							type="button"
							// value="Join"
							onClick={handleJoinStream}
							disabled={joined ? true : false}
						>
							Join meeting
						</Button>
					</Form.Group>
				</div>
			)}
		</div>
	);
}

export default ConsultantVideo;
