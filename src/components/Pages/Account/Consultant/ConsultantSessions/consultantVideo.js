import React, { useEffect, useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import classes from "./consultantVideo.module.css";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
// import ReactDOM from "react-dom";
import { getAgoraToken } from "../../../../../store/actions/consultantActions/consultantActions";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

import { useParams } from "react-router-dom";
import { PageWrapPayment } from "../../../../SubComponents/PageWrapPayment";

function ConsultantVideo(props) {
	const [joined, setJoined] = useState(false);

	const [channelName, setChannelName] = useState("");
	const [videoLoading, setVideoLoading] = useState(false);
	const [client, setClient] = useState(null);
	const [localAudioTrack, setLocalAudioTrack] = useState(null);
	const [localVideoTrack, setLocalVideoTrack] = useState(null);
	const [remoteVideoTrack, setRemoteVideoTrack] = useState([]);

	let { id } = useParams();

	let callType = id.split("-")[2].substring(0, 2);

	let duration = id.split("-")[1];

	// console.log(duration, `this is the call type`);
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

	const { auth } = props;

	useEffect(() => {}, [channelName, client]);

	// console.log(remoteVideoTrack);

	const options = {
		// Pass your app ID here
		appId: process.env.REACT_APP_AGORA_ID,
		// Pass a token if your project enables the App Certificate
		cert: process.env.REACT_APP_AGORA_CERT,
	};

	useEffect(() => {
		const handleUserLeft = (user) => {
			// Get the dynamically created DIV container
			const playerContainer = document.getElementById(user.uid);
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

			if (callType === "xV") {
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
		// const agoraToken = await getAgoraToken(callDuration, auth.uid, channelName);
		// console.log(agoraToken);

		// client.join(agoraAppId, channelName, agoraToken, uid,)
		setClient(newClient);
		try {
			if (channelRef.current.value === "") {
				return console.log("Please Enter Channel Name");
			}

			// const role = AgoraRTC.Role.PUBLISHER;

			// console.log(role, `this is the role`);
			setJoined(true);

			let result = await getAgoraToken(
				duration,
				auth.uid,
				channelName
				// role
			);

			console.log(result.token, `this is the token`);

			const uid = await newClient.join(
				options.appId,
				channelName,
				options.cert,
				result.token,
				result.uid
				// options.appId
			);

			console.log(options.appId, `this is the appId and the uid`);

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
		<PageWrapPayment header="Call">
			<div>
				{joined ? (
					<div>
						Room: {channelName}
						<div className={classes.streamCont}>
							<div id="local-stream" className={classes.video}>
								<LocalPhoneRoundedIcon />
							</div>
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
		</PageWrapPayment>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

export default connect(mapStateToProps)(ConsultantVideo);
