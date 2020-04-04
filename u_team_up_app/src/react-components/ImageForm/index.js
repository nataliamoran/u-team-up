import React from "react";
import { addImage, getImage } from "../../actions/image";
import "./styles.css";

class ImageForm extends React.Component {
    state = {
        imageUrl:''
    }
    render() {
        const { profile, username } = this.props;
        // let {imageUrl} = this.state
        return (
            <React.Fragment>
                <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, profile, username);
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

                    {/*<img src={imageUrl} alt="profileImg"/>*/}

                </form>
            </React.Fragment>
        );
    }
}

export default ImageForm;
