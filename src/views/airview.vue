<template>
	<div>
		<TopFixed />
		<div class="box-1">
			<v-touch @pan="pan" @panend="panend" @pinch="pinch">
				<div class="box-1-0"
					style="display: flex;align-self: center;justify-content: center;overflow: hidden;position: relative;">
					<div class="topbj">
						<img :src="aboveImage" />
					</div>
					<div v-if="!loading && imgs.length>0"
						style="display: flex;align-self: center;justify-content: center;overflow: hidden;position: relative;z-index: 2;">
						<img :src="item.src" v-for="(item,i) in imgs" :key="i" v-show="index == i"
							:style="'width:'+imgW+'px;height:' + imgH + 'px'" />
						<!-- <van-image
							width="100vw"
							height="100vh"
							fit="contain"
							:src="item.src"
							v-for="(item,i) in imgs" :key="i"
							v-show="index == i"
							@click="previewImg(i)"
						/> -->
					</div>
					<div v-else
						style="position: relative;z-index: 20;display: flex;align-self: center;justify-content: center;background-color: #fff;width: 100%;height: 100%;">
						<radial-progress-bar :diameter="100" :completed-steps="loaded" :total-steps="imgCount"
							:startColor="'rgb(0, 142, 255)'" :stopColor="'rgb(0, 142, 255)'" :animateSpeed="200"
							:innerStrokeColor="'rgb(168,212,247)'" style="align-self: center;justify-content: center;">
							<p style="font-size:16px">{{progress}}%</p>
						</radial-progress-bar>
					</div>
					<div class="bottombj">
						<img :src="belowImage" />
					</div>
				</div>
			</v-touch>
		</div>
		<!-- <BottomNav navCode="Houseappreciation" /> -->
		<!-- <van-image-preview v-model="show" :images="images"></van-image-preview> -->
	</div>
</template>
<script>
	import TopFixed from "@/components/TopFixed.vue";
	// import BottomNav from "@/components/BottomNav.vue";

	import RadialProgressBar from 'vue-radial-progress'
	export default {
		name: 'airview',
		components: {
			TopFixed,
			// BottomNav,
			RadialProgressBar
		},
		data() {
			return {
				id: 0,
				bottomData: window.bottomData,
				bottomDataName: '',
				bottomDataIndex: 0,
				imgsrc: require('../assets/imgs/loading.gif'),
				//backDrop: window.backDrop,
				aboveImage:window.aboveImage,
				belowImage:window.belowImage,
				index: 0,
				imgs: [],
				loading: true,
				isFinished: true,
				imgW: 100,
				imgH: 100,
				canvasW: 0,
				canvasH: 0,
				maxImgW: 100,
				maxImgH: 100,
				minImgW: 100,
				minImgH: 100,
				tmpTime: 0,
				maxTime: .05,
				loaded: 0,
				imgCount: 0,
				progress: 0
				// images:[],
				// show:false
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.bottomDataName = this.$route.query.bottomDataName;
			this.bottomDataIndex = this.$route.query.bottomDataIndex;
			this.onloadImgs(this.bottomData[this.bottomDataName][this.bottomDataIndex].maps[this.id].houseImages);
			this.imgCount = this.bottomData[this.bottomDataName][this.bottomDataIndex].maps[this.id].houseImages.length;
		},
		methods: {
			async onloadImgs(imgs) {
				for (let i = 0; i < imgs.length; i++) {
					await this.onloadImg(imgs[i].url);
				}
				this.loading = false;

				setTimeout(this.autoRotate, this.maxTime / 2* 1000);
			},
			onloadImg(imgsrc) {
				var isLoaded = false;
				return new Promise((resolve, reject) => {
					let newImg = new Image();
					newImg.src = imgsrc;
					newImg.onerror = () => { // 图片加载错误时的替换图片
						newImg.src = ''; //任意本地图片
						reject();
					};
					newImg.onload = () => { // 图片加载成功后把地址给原来的img
						this.imgs.push(newImg);
						resolve();
						this.loaded++;
						this.progress = (this.loaded / this.imgCount * 100).toFixed(2);
						if (isLoaded == false) {
							this.canvasW = document.body.clientWidth;
							this.canvasH = document.body.clientHeight;
							this.imgW = newImg.width;
							this.imgH = newImg.height;
							if (this.imgW > this.imgH) {
								this.imgH = this.imgH * this.canvasW / this.imgW;
								this.imgW = this.canvasW;
							} else {
								this.imgW = this.imgW * this.canvasH / this.imgH;
								this.imgH = this.canvasH;
							}
							this.maxImgW = this.imgW * this.canvasH / this.imgH;
							this.maxImgH = this.canvasH;
							this.minImgW = this.imgW;
							this.minImgH = this.imgH;
							isLoaded = true;
						}
					};
				});
			},
			autoRotate: function () {
				if (this.index + 1 < this.imgs.length) {
					this.index++
					setTimeout(this.autoRotate, this.maxTime / 2 * 1000);
				} else {
					this.index = 0;
				}
			},
			pan(e) {
				if ((e.deltaTime - this.tmpTime) / 1000 >= this.maxTime) {
					this.tmpTime = e.deltaTime;
					if (e.additionalEvent == 'panleft' || e.additionalEvent == 'pandown') {
						if (this.index + 1 < this.imgs.length) {
							this.index++
						} else {
							this.index = 0;
						}
					} else if (e.additionalEvent == 'panright' || e.additionalEvent == 'panup') {
						if (this.index - 1 >= 0) {
							this.index--
						} else {
							this.index = this.imgs.length - 1;
						}
					}
				}
			},
			panend() {
				this.tmpTime = 0;
			},
			pinch(e) {
				if (e.additionalEvent == 'pinchin') {
					if (this.imgW > this.minImgW) {
						this.imgW -= e.distance;
						this.imgH -= e.distance * this.minImgH / this.minImgW;
					}
				} else if (e.additionalEvent == 'pinchout') {
					if (this.imgW < this.maxImgW) {
						this.imgW += e.distance;
						this.imgH += e.distance * this.minImgH / this.minImgW;
					}
				}

				if (this.imgW < this.minImgW) {
					this.imgW = this.minImgW;
				} else if (this.imgW > this.maxImgW) {
					this.imgW = this.maxImgW;
				}

				if (this.imgH < this.minImgH) {
					this.imgH = this.minImgH;
				} else if (this.imgH > this.maxImgH) {
					this.imgH = this.maxImgH;
				}
			}
			// previewImg(i){
			// 	this.images = [this.imgs[i].src];
			// 	this.show = true;
			// }
		}
	}
</script>
<style scoped>
	.box-1{
		height: calc(100vh - 66.5px);
	}
	.box-1-0 {
		height: 100vh;
		background-color: #fff;
	}
	.topbj{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 1;
	}
	.topbj img{
		display: block;
		width: 100%;
		height: auto;
	}
	.bottombj{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 1;
	}
	.bottombj img{
		display: block;
		width: 100%;
		height: auto;
	}
</style>