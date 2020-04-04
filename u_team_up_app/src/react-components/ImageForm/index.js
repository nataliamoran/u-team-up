import React from "react";
import Button from "@material-ui/core/Button";
import { addImage, getImage } from "../../actions/image";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import "./styles.css";

class ImageForm extends React.Component {
    state = {
        imageUrl:''
    }
    render() {
        const { profile } = this.props;
        let {imageUrl} = this.state
        return (
            <React.Fragment>
                <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, profile);
                }}>
                    <div className="image-form__field">

                        <input name="image" type="file" />
                    </div>
                    <button
                        className="img_upload_button"
                        type="submut"
                        onClick={() => getImage(this)}
                    >
                        Upload profile picture
                    </button>

                    <img src={imageUrl} alt="profileImg"/>

                </form>
            </React.Fragment>
        );
    }
}

export default ImageForm;
