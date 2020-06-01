import React from 'react'
import {Modal} from 'react-bootstrap'
import YouTube from '@u-wave/react-youtube';
import Zoom from 'react-reveal/Zoom';


export default function YoutubeModal(props) {
    return (
        <div>
          <Zoom top>
        <Modal
      {...props}
      size="lg"     
      dialogClassName="modal-90h"
      aria-labelledby="contained-modal-title-vcenter"
      centered
     >
      <Modal.Header id="modal-head" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Youtube trailer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body">
        <h4>{props.movieID.name? props.movieID.name:"Untitled Movie"}</h4>
        <div className="d-flex justify-content-center">
        <YouTube
              video={props.movieID.key? props.movieID.key:"fT7pFSfVZBI"}
              allowFullscreen
              height="480px"
              width="600px"
              controls
            />
          </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
    </Zoom>
        </div>
    )
}
