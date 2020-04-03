import React from "react";
import Button from "@material-ui/core/Button";
import { addImage, getImage } from "../../actions/image";

import "./styles.css";

class ImageForm extends React.Component {

    render() {
        const { profile } = this.props;

        return (
            <React.Fragment>
                <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, profile);
                }}>
                    <div class="image-form__field">
                        
                        <input name="image" type="file" />
                    </div>
                    <button
                        className="img_upload_button"
                        type="submut"
                        onClick={() => getImage(this)}
                    >
                        Upload profile picture
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

export default ImageForm;
