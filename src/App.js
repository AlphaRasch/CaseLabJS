import "./App.css";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import store from "./store";

const App = observer( () => {
    useEffect(() => store.fetchImages(), []);

    return (
        <div className="app">
            {store.images.map((image, index) => (
                <img
                    src={store.urlImgAssets + image.preview}
                    alt={image.name}
                    className="div_img"
                    onClick={() => store.showModal(index)}
                />
            ))}
            {store.modalVisible && (
                <dialog id="modalDialog" open>
                    <div className="div_modal">
                        <img
                            src={store.urlImgAssets + store.images[store.currentImageIndex].preview}
                            className="img_modal"
                            id="img_modal"
                        />
                        <div className="div_buttons">
                            <p id="indexImg">
                                {store.currentImageIndex + 1}/{store.images.length}
                            </p>
                            <input
                                type="button"
                                id="leftButton"
                                value="&#8592;"
                                onClick={store.previousImage}
                            />
                            <input
                                type="button"
                                id="rightButton"
                                value="&#8594;"
                                onClick={store.nextImage}
                            />
                            <input
                                type="button"
                                id="closeDialog"
                                value="&#10060;"
                                onClick={store.hideModal}
                            />
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
});

export default App;

