$(document).ready(function() {
    let score = 0;
    let currentQuestion = 1;
    const totalQuestions = $(".questions").length;

    // === TIPS ARRAYS ===
    const tipsLow = [
        "Review weather and NOTAMs (METAR/TAF, active runways).",
        "Double-check fuel, payload, and performance before pushback.",
        "Keep charts and frequencies readily available.",
        "Maintain listening watch on ATC and monitor nearby traffic (e.g., VATSpy).",
        "Practice correct phraseology, checklists, and standard procedures.",
        "Keep contingency plans in mind (alternate, missed approach)."
    ];

    const tipsMedium = [
        "Pre-brief route and STAR/SID transitions; note likely runways and clearances.",
        "Load FMC and verify every waypoint; avoid route discontinuities.",
        "Monitor ATIS early to anticipate runway/frequency changes.",
        "Reduce distractions (mute Discord, minimize background noise).",
        "Check weather updates enroute and plan for deviations.",
        "Keep checklists handy to prevent skipping steps under pressure.",
        "Adjust automation level — use what fits your comfort.",
        "Be ready to say 'unable' or 'request delay' when overloaded."
    ];

    const tipsHigh = [
        "Consider postponing the flight until conditions improve.",
        "Simplify your route — avoid multiple STAR transitions or complex routings.",
        "Use co-pilot or shared cockpit to split workload.",
        "Pre-tune backup frequencies for faster access.",
        "Ask for progressive taxi or vectors if unfamiliar with the airport.",
        "Request extended downwind or holding to give yourself time.",
        "Brief emergency and missed approach procedures before departure.",
        "Communicate proactively with ATC; let them know if you’re new or need extra time."
    ];

    $(".answer").on("click", function() {
        score += parseInt($(this).data("value"));
        $(this).closest(".questions").hide();
        currentQuestion++;

        if (currentQuestion <= totalQuestions) {
            $("#q" + currentQuestion).fadeIn(300);
        } else {
            const color = getGradientColor(score);
            $("#risk-total").css("background-color", color);
            $("#risk-total").html(`${score} pts`);
            $("#results").show();

            // Clear old tips
            $("#results .tip").remove();

            // Determine risk category + generate tips
            let tipsToShow = [];
            if (score < 10) {
                $("#overview-category").text("Not Complex Flight");
                $("#overview-text").text("Low overall risk. The flight should be routine and predictable, with minimal workload or environmental challenges.");
                tipsToShow = tipsLow;
            } else if (score < 20) {
                $("#overview-category").text("Exercise Caution");
                $("#overview-text").text("Moderate complexity. The flight may involve busy airspace, moderate weather, or unfamiliar procedures. Workload is manageable but requires deliberate attention and planning.");
                tipsToShow = tipsMedium;
            } else {
                $("#overview-category").text("Area of Concern");
                $("#overview-text").text("High complexity or workload. Conditions could exceed comfort limits due to severe weather, unfamiliar aircraft or procedures, or very busy ATC environments.");
                tipsToShow = tipsHigh;
            }

            // Append new tips dynamically
            tipsToShow.forEach(tip => {
                $("#results").append(`
                    <div class="tip">
                        <div style="flex:20%; text-align:left;">
                            <img src="img/tip.png" width="64px">
                        </div>
                        <div class="tip-text">${tip}</div>
                    </div><br>
                `);
            });
        }
    });

    // === COLOR GRADIENT ===
    const colorStops = [
        { stop: 0, color: "#5e81ac" },
        { stop: 10, color: "#a3be8c" },
        { stop: 20, color: "#ebcb8b" },
        { stop: 30, color: "#bf616a" }
    ];

    function getGradientColor(score) {
        score = Math.min(Math.max(score, 0), 30);
        let lower = colorStops[0], upper = colorStops[colorStops.length - 1];

        for (let i = 0; i < colorStops.length - 1; i++) {
            if (score >= colorStops[i].stop && score <= colorStops[i + 1].stop) {
                lower = colorStops[i];
                upper = colorStops[i + 1];
                break;
            }
        }

        const ratio = (score - lower.stop) / (upper.stop - lower.stop);
        return blendColors(lower.color, upper.color, ratio);
    }

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
});
