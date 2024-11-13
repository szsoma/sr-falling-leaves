document.addEventListener('DOMContentLoaded', () => {
  // Select the SVG wrapper and all leaf elements
  const svgWrapper = document.querySelector('.svg-wrapper');
  const leaves = Array.from(document.querySelectorAll('#leaf'));
  
  // Check if elements exist
  if (!svgWrapper || leaves.length === 0) {
      console.error("SVG wrapper or leaves not found.");
      return;
  }

  // Get the SVG wrapper dimensions
  const wrapperBounds = svgWrapper.getBoundingClientRect();
  const wrapperHeight = wrapperBounds.height;

  // Define the exact Y position for the landing line (20px from bottom)
  const landingLineY = wrapperHeight - 50;

  // Date calculations
  const startDate = new Date('2024-11-01');
  const endDate = new Date('2024-11-30');
  const currentDate = new Date();; // Add your own date for testing

  // Ensure dates are valid
  if (currentDate < startDate) {
      console.log("Animation hasn't started yet");
      return;
  }

  // Calculate leaves to animate
  const totalDurationInSeconds = (endDate - startDate) / 1000;
  const timeElapsedInSeconds = Math.min(currentDate - startDate, endDate - startDate) / 1000;
  const percentageElapsed = Math.min(timeElapsedInSeconds / totalDurationInSeconds, 1);
  const totalLeavesToFall = Math.round(leaves.length * percentageElapsed);

  // Select leaves to animate
  const leavesToAnimate = leaves.slice(0, totalLeavesToFall);

  // Create timeline for better control
  const mainTimeline = gsap.timeline();

  // Calculate initial positions for each leaf
  leavesToAnimate.forEach(leaf => {
      const initialBounds = leaf.getBoundingClientRect();
      
      // Store initial position
      leaf.dataset.initialX = initialBounds.left - wrapperBounds.left;
      leaf.dataset.initialY = initialBounds.top - wrapperBounds.top;
  });

  // Animate each leaf
  leavesToAnimate.forEach(leaf => {
      mainTimeline.add(gsap.to(leaf, {
          y: landingLineY - parseFloat(leaf.dataset.initialY), // Exact landing position
          x: `+=${gsap.utils.random(-30, 30)}`, // Small random horizontal shift
          rotation: gsap.utils.random(-60, 60),
          duration: gsap.utils.random(3, 5),
          ease: "power2.inOut",
          delay: gsap.utils.random(0, 2),
      }), 0); // The '0' ensures all animations start at the same time
  });
});
