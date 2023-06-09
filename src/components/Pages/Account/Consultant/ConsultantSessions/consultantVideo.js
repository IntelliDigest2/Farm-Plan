import React, { useEffect, useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import classes from "./consultantVideo.module.css";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
// import ReactDOM from "react-dom";
import { getAgoraToken } from "../../../../../store/actions/consultantActions/consultantActions";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

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
	// const [first, setfirst] = useState(second)

	let { id } = useParams();

	let callType = id.split("-")[2].substring(0, 2);
	console.log(callType, `this is the call type here`);

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

			console.log(callType);

			// if (callType === "xV") {
			if (mediaType === "video" || mediaType === "all") {
				// Get `RemoteVideoTrack` in the `user` object.
				const remoteVideoTrack = user.videoTrack;
				setRemoteVideoTrack(remoteVideoTrack);

				// Dynamically create a container in the form of a DIV element for playing the remote video track.

				const newNode = document.createElement("div");
				// console.log(`t`);
				newNode.id = user.uid;
				newNode.classList.add(`${classes.subVid}`);

				remoteRef.current.appendChild(newNode);

				user.videoTrack.play(`${user.uid}`);
			}
			// }

			if (mediaType === "audio" || mediaType === "all") {
				// Get `RemoteAudioTrack` in the `user` object.
				const remoteAudioTrack = user.audioTrack;
				// Play the audio track. Do not need to pass any DOM element
				remoteAudioTrack.play();
			}
		};
		if (client !== null) {
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
			if (callType === "xV") {
				localVideoTrack.close();
			}

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
		if (e.target.value.trim() === " ") {
			return;
		}
		const newClient = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

		setClient(newClient);
		try {
			if (channelRef.current.value === "") {
				return console.log("Please Enter Channel Id");
			}

			const role = "publisher";
			setJoined(true);

			let result = await getAgoraToken(duration, auth.uid, channelName, role);

			const uid = await newClient.join(
				options.appId,
				channelName,
				result.data.token,
				auth.uid
			);

			const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
			setLocalAudioTrack(localAudioTrack);
			// Create a video track from the video captured by a camera
			console.log(callType, `this is the callType before the if statement`);
			let localVideoTrack;
			if (callType === "xV") {
				localVideoTrack = await AgoraRTC.createCameraVideoTrack();
				setLocalVideoTrack(localVideoTrack);
			}

			console.log(localVideoTrack);

			if (callType === "xV") {
				await newClient.publish([localAudioTrack, localVideoTrack]);
				// console.log(`here`);
			} else {
				await newClient.publish([localAudioTrack]);
			}

			if (callType === "xV") {
				// Play localStream
				localVideoTrack.play("local-stream");
				// console.log(`here 2`);
			}
		} catch (err) {
			console.error(err, `this is the error generated`);
		}
	}

	let callContent =
		callType === "xV" ? (
			<>
				<div id="local-stream" className={classes.localVid}></div>
				<div
					id="remote-stream"
					ref={remoteRef}
					className={classes.remoteVid}
				></div>
			</>
		) : (
			<>
				<div id="local-stream" className={classes.localAud}>
					{" "}
					<LocalPhoneRoundedIcon className={classes.phonebg} />{" "}
				</div>
				<div
					id="remote-stream"
					// ref={remoteRef}
					className={classes.remoteAud}
				>
					<PhoneEnabledIcon className={classes.phonesm} />
				</div>
			</>
		);

	return (
		<PageWrapPayment header="Call">
			<div>
				{joined ? (
					<div>
						Channel Id : {channelName}
						<div className={classes.streamCont}>{callContent}</div>
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
