$(document).ready(function() {
    // Initialize sliders with current input values
    $("#hStart-slider").slider({
        min: -50,
        max: 50,
        value: parseInt($("#hStart").val()) || 0,
        slide: function(event, ui) {
            $("#hStart").val(ui.value);
            generateTable();
        }
    });
    $("#hEnd-slider").slider({
        min: -50,
        max: 50,
        value: parseInt($("#hEnd").val()) || 0,
        slide: function(event, ui) {
            $("#hEnd").val(ui.value);
            generateTable();
        }
    });
    $("#vStart-slider").slider({
        min: -50,
        max: 50,
        value: parseInt($("#vStart").val()) || 0,
        slide: function(event, ui) {
            $("#vStart").val(ui.value);
            generateTable();
        }
    });
    $("#vEnd-slider").slider({
        min: -50,
        max: 50,
        value: parseInt($("#vEnd").val()) || 0,
        slide: function(event, ui) {
            $("#vEnd").val(ui.value);
            generateTable();
        }
    });

    // Bind input fields to sliders
    $("#hStart").on("input", function() {
        $("#hStart-slider").slider("value", this.value);
        generateTable();
    });
    $("#hEnd").on("input", function() {
        $("#hEnd-slider").slider("value", this.value);
        generateTable();
    });
    $("#vStart").on("input", function() {
        $("#vStart-slider").slider("value", this.value);
        generateTable();
    });
    $("#vEnd").on("input", function() {
        $("#vEnd-slider").slider("value", this.value);
        generateTable();
    });

    // Form validation
    $("#multiplication-form").validate({
        rules: {
            hStart: { required: true, number: true, range: [-50, 50] },
            hEnd: { required: true, number: true, range: [-50, 50] },
            vStart: { required: true, number: true, range: [-50, 50] },
            vEnd: { required: true, number: true, range: [-50, 50] }
        },
        messages: {
            hStart: { required: "Please enter a starting horizontal value.", number: "Please enter a valid number.", range: "Value must be between -50 and 50." },
            hEnd: { required: "Please enter an ending horizontal value.", number: "Please enter a valid number.", range: "Value must be between -50 and 50." },
            vStart: { required: "Please enter a starting vertical value.", number: "Please enter a valid number.", range: "Value must be between -50 and 50." },
            vEnd: { required: "Please enter an ending vertical value.", number: "Please enter a valid number.", range: "Value must be between -50 and 50." }
        },
        submitHandler: function(form) {
            generateTable();
            return false; // prevent default form submission
        }
    });

    function generateTable() {
        const hStart = parseInt($("#hStart").val());
        const hEnd = parseInt($("#hEnd").val());
        const vStart = parseInt($("#vStart").val());
        const vEnd = parseInt($("#vEnd").val());

        const tableContainer = $("#table-container");
        tableContainer.empty(); // Clear previous table

        const table = $("<table>");
        const thead = $("<thead>");
        const tbody = $("<tbody>");

        // Create table header
        const headerRow = $("<tr>");
        headerRow.append($("<th>")); // Top-left empty cell

        for (let h = hStart; h <= hEnd; h++) {
            const th = $("<th>").text(h);
            headerRow.append(th);
        }
        thead.append(headerRow);

        // Create table body
        for (let v = vStart; v <= vEnd; v++) {
            const row = $("<tr>");
            const th = $("<th>").text(v);
            row.append(th);

            for (let h = hStart; h <= hEnd; h++) {
                const td = $("<td>").text(h * v);
                row.append(td);
            }
            tbody.append(row);
        }

        table.append(thead);
        table.append(tbody);
        tableContainer.append(table);
    }
});
