

document.addEventListener("DOMContentLoaded", function () {
    // An array of image and video URLs to preload
    const assetUrls = [
        "https://res.cloudinary.com/dyve8u6cx/video/upload/v1702353346/IMG_9821_pm3v7s.mov",
        "https://res.cloudinary.com/dwadiagkb/image/upload/v1701660307/WDL_COVER_SMALL_uspex0.png",
        "https://res.cloudinary.com/dyve8u6cx/image/upload/v1702347240/interception1_aixcgj.png",
        "https://res.cloudinary.com/dyve8u6cx/image/upload/v1702347570/HOME_-_Copy_mxrhux.png",
        "https://res.cloudinary.com/dyve8u6cx/image/upload/v1702347776/HOME_g5dhju.png",
        "https://res.cloudinary.com/dyve8u6cx/image/upload/v1702348040/TATTOO_CEREMONY_dgs6c6.jpg",
        "https://res.cloudinary.com/dyve8u6cx/image/upload/v1702348129/ABOUT_lcmry6.jpg",
        "https://res.cloudinary.com/dyve8u6cx/image/upload/v1702352051/IMG_5838_p8lqze.png",
        "https://res.cloudinary.com/dyve8u6cx/image/upload/v1711255462/WEB-DESIGN-LOOKBOOK-UNCOMPRESSED-146MB-_1_-1_g7opza.jpg",
        "../WEB-DESIGN-LOOKBOOK-UNCOMPRESSED-146MB-_1_-1_g7opza.jpg",
        "../IMG_9821_pm3v7s (1).mov"
       
    ];

    // Counter to track loaded assets
    let loadedCount = 0;
    let totalAssets = assetUrls.length;

    // Function to update the loading bar
    function updateLoadingBar() {
        loadedCount++;
        const progress = (loadedCount / totalAssets) * 100;
        const loadingBar = document.querySelector(".loader-bar");
        loadingBar.style.width = progress + "%";

        if (loadedCount === totalAssets) {
            // All assets are loaded, smoothly complete the loading bar animation
            loadingBar.style.animation = "complete-progress 0.5s linear forwards";
            // Hide the loading screen after the animation completes
            setTimeout(function () {
                document.querySelector(".loading-screen").style.display = "none";
                // Display the content once the loading screen is hidden
                document.querySelector(".content").style.display = "block";
            
                // Call adjustHeight after all assets are loaded
                adjustHeight();

                // Bind adjustHeight to window resize event after assets are loaded
                $(window).resize(adjustHeight);
            
            }, 500); // Adjust the duration to match your animation time
        }
    }

    // Preload images and videos
    assetUrls.forEach(function (url) {
        const asset = new Image(); // Use Image for images, or create video elements for videos
        asset.src = url;
        asset.onload = updateLoadingBar;
        asset.onerror = updateLoadingBar; // Handle errors if needed
    });

    function adjustHeight() {
        console.log("adjustHeight called");
        var backgrounds = $('.background');
        var aspectRatio = 1.25; // height / width of image

        $('.interception-img').each(function () {
                // Assuming each .interception-img has an image as a direct child
                var imageHeight = $(this).find('img').height();
                $(this).css('height', imageHeight + 'px');
                console.log("interception called");
        });

        // Check if aspect ratio of the screen is 1:1 or less
        if (window.innerWidth <= 649) {
            // Set height based on width and aspect ratio for each background element
            backgrounds.each(function () {
                $(this).css('min-height', $(this).width() * aspectRatio + 'px');
            });
            
        } else if (650 <= window.innerWidth && window.innerWidth <= 1100 ) {
            var screenWidth = window.innerWidth;
            var minScreenHeight = (screenWidth * 0.7) * aspectRatio;
            
            backgrounds.css('min-height', minScreenHeight + 'px');
            console.log("ipad is triggered");
            
        } else if (1100 < window.innerWidth) {
            var screenWidth = window.innerWidth;
            var minScreenHeight = (screenWidth * 0.4) * aspectRatio;
            
            backgrounds.css('min-height', minScreenHeight + 'px');
            console.log("large screen triggered");
            
        }
    }

    // Initial call to set the height
    adjustHeight();
});
