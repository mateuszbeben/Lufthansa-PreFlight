$(document).ready(function() {
    let score = 0;
    let currentQuestion = 1;
    const totalQuestions = $(".questions").length;

    $(".answer").on("click", function() {
        // Add score
        score += parseInt($(this).data("value"));

        // Hide current and show next
        $(this).closest(".questions").hide();
        currentQuestion++;

        if (currentQuestion <= totalQuestions) {
            $("#q" + currentQuestion).fadeIn(300);
        } else {
            // All done — show results
            const color = getGradientColor(score);
            $("#risk-total").css("background-color", color);
            $("#results").show();
            if (score < 10)
            {
                $("#risk-total").html(`${score} pts`);
                /*$("#results").html(
                `✅ Your total FRAT score: <strong>${score}</strong><br>` +
                `<h3 style="color:#2e7d32;">✅ Not Complex Flight (0–10 pts)</h3>
                <p><strong>Overview:</strong> Low overall risk. The flight should be routine and predictable, with minimal workload or environmental challenges.</p>
                <ul>
                    <li>Review weather and NOTAMs (METAR/TAF, active runways).</li>
                    <li>Double-check fuel, payload, and performance before pushback.</li>
                    <li>Keep charts and frequencies readily available.</li>
                    <li>Maintain listening watch on ATC and monitor nearby traffic (e.g., VATSpy).</li>
                    <li>Practice correct phraseology, checklists, and standard procedures.</li>
                    <li>Keep contingency plans in mind (alternate, missed approach).</li>
                    <li>Don’t rush — brief your flight even if it’s simple.</li>
                </ul>`
                );*/
            }
            else if (score < 20)
            {
                $("#risk-total").html(`${score} pts`);
                /*$("#results").html(
                `✅ Your total FRAT score: <strong>${score}</strong><br>` +
                `<h3 style="color:#f9a825;">⚠️ Exercise Caution (10–20 pts)</h3>
                <p><strong>Overview:</strong> Moderate complexity. The flight may involve busy airspace, moderate weather, or unfamiliar procedures. Workload is manageable but requires deliberate attention and planning.</p>
                <ul>
                    <li>Pre-brief route and STAR/SID transitions; note likely runways and clearances.</li>
                    <li>Load FMC and verify every waypoint; avoid route discontinuities.</li>
                    <li>Monitor ATIS early to anticipate runway/frequency changes.</li>
                    <li>Reduce distractions (mute Discord, minimize background noise).</li>
                    <li>Check weather updates enroute and plan for deviations.</li>
                    <li>Keep checklists handy to prevent skipping steps under pressure.</li>
                    <li>Adjust automation level — use what fits your comfort.</li>
                    <li>Prepare phraseology in advance, especially if English isn’t your first language.</li>
                    <li>Be ready to say “unable” or “request delay” when overloaded.</li>
                    <li>Fly during quieter times or choose smaller airports if possible.</li>
                </ul>`
                );*/
            }
            else
            {
                $("#risk-total").html(`${score} pts`);
                /*$("#results").html(
                `✅ Your total FRAT score: <strong>${score}</strong><br>` +
                `<h3 style="color:#c62828;">🔴 Area of Concern (20–30 pts)</h3>
                <p><strong>Overview:</strong> High complexity or workload. Conditions could exceed comfort limits due to severe weather, unfamiliar aircraft or procedures, or very busy ATC environments.</p>
                <ul>
                    <li>Consider postponing the flight until conditions improve.</li>
                    <li>Simplify your route — avoid multiple STAR transitions or complex routings.</li>
                    <li>Use co-pilot or shared cockpit to split workload.</li>
                    <li>Pre-tune backup frequencies for faster access.</li>
                    <li>Use autopilot strategically to manage workload.</li>
                    <li>Ask for progressive taxi or vectors if unfamiliar with the airport.</li>
                    <li>Request extended downwind or holding to give yourself time.</li>
                    <li>Brief emergency and missed approach procedures before departure.</li>
                    <li>Use aids like Navigraph or SimToolkitPro for situational awareness.</li>
                    <li>Take breaks between flights — avoid fatigue buildup.</li>
                    <li>Stay hydrated and alert — fatigue increases risk.</li>
                    <li>Communicate proactively with ATC; let them know if you’re new or need extra time.</li>
                </ul>`
                );*/
            }
            
        }
    });

    // Define color stops for interpolation
    const colorStops = [
        { stop: 0, color: "#5e81ac" }, // blue
        { stop: 10, color: "#a3be8c" }, // green
        { stop: 20, color: "#ebcb8b" }, // amber
        { stop: 30, color: "#bf616a" }  // red
    ];

    function getGradientColor(score) {
        // Clamp
        score = Math.min(Math.max(score, 0), 30);
        let lower = colorStops[0], upper = colorStops[colorStops.length - 1];

        // Find range
        for (let i = 0; i < colorStops.length - 1; i++) {
            if (score >= colorStops[i].stop && score <= colorStops[i + 1].stop) {
                lower = colorStops[i];
                upper = colorStops[i + 1];
                break;
            }
        }

        // Interpolation ratio
        const ratio = (score - lower.stop) / (upper.stop - lower.stop);

        // Blend colors
        return blendColors(lower.color, upper.color, ratio);
    }

    // Helper to blend hex colors
    function blendColors(c1, c2, ratio) {
        const hex = (x) => {
            const r = Math.round(x).toString(16);
            return r.length === 1 ? "0" + r : r;
        };

        const r1 = parseInt(c1.substring(1,3), 16);
        const g1 = parseInt(c1.substring(3,5), 16);
        const b1 = parseInt(c1.substring(5,7), 16);
        const r2 = parseInt(c2.substring(1,3), 16);
        const g2 = parseInt(c2.substring(3,5), 16);
        const b2 = parseInt(c2.substring(5,7), 16);

        const r = r1 + (r2 - r1) * ratio;
        const g = g1 + (g2 - g1) * ratio;
        const b = b1 + (b2 - b1) * ratio;

        return "#" + hex(r) + hex(g) + hex(b);
    }

    // Optional text summary
    function getRiskLevel(score) {
        if (score <= 7) return "🧊 Low Risk";
        if (score <= 15) return "🌿 Moderate Risk";
        if (score <= 22) return "🌅 Elevated Risk";
        return "🔥 High Risk";
    }
});