import {makeAutoObservable, makeObservable} from "mobx";

class Store{
    images = [];
    urlImgAssets = process.env.REACT_APP_URL_IMG_ASSETS;
    modalVisible = false;
    currentImageIndex = 0;
    imgTag;

    constructor(){
        makeAutoObservable(this);
    }

    fetchImages = () =>{
        fetch(process.env.REACT_APP_JSON_IMG,
            {
                method: "GET",
                credentials: "include",
                Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            }).then((res) => res.json())
            .then((res) => {this.images = res["data"]});
    }

    showModal = (index) => {
        this.modalVisible = true;
        this.currentImageIndex = index;
    }

    hideModal =() => {
        this.modalVisible = false;
    }

    nextImage = () => {
        this.imgTag = document.getElementById("img_modal");
        if (this.currentImageIndex == this.images.length-1) {
            this.currentImageIndex = 0;
        } else{
            this.currentImageIndex += 1;
        }
        this.imgTag.src = process.env.REACT_APP_URL_IMG_ASSET + this.images[this.currentImageIndex].preview;
    }

    previousImage = () =>{
        this.imgTag = document.getElementById("img_modal");
        if(this.currentImageIndex == 0){
            this.currentImageIndex = this.images.length - 1;
        } else {
            this.currentImageIndex -= 1;
        }
        this.imgTag.src = process.env.REACT_APP_URL_IMG_ASSET + this.images[this.currentImageIndex].preview;
    }
}

const store = new Store();
export default store;