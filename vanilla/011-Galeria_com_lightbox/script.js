const images = document.querySelectorAll(".image")
const lightbox = document.querySelector(".lightbox")
const lightboxImage = document.querySelector(".lightbox_image")
const closeElement = document.querySelector(".icon_close")

images.forEach(image => {
    image.addEventListener("click", () => {
        const dataImage = image.getAttribute("data-src")
        lightbox.style.display = "flex"
        lightboxImage.setAttribute("src", dataImage)
    })
    closeElement.addEventListener("click", () => {
        lightbox.style.display = "none"
    })
})