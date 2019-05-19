google.charts.load('current', {
    'packages':['geochart','corechart','line'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
google.charts.setOnLoadCallback(drawChart);

budget_url = "https://docs.google.com/spreadsheets/d/18SWb_dlY6W9dlp_DpA0K4MHWAqF-PYBKhoxEsG7a9z0/gviz/tq?sheet=budget&headers=1&tq=";
descriptive_url = "https://docs.google.com/spreadsheets/d/18SWb_dlY6W9dlp_DpA0K4MHWAqF-PYBKhoxEsG7a9z0/gviz/tq?sheet=descriptive_stat&headers=1&tq=";

function drawChart() {
    // All budget
    var queryString = encodeURIComponent("select A, B");
    var query = new google.visualization.Query(budget_url + queryString );
    query.send(drawLineAllBudget);

    var queryString = encodeURIComponent("select E, F");
    var query = new google.visualization.Query(descriptive_url + queryString );
    query.send(drawPieAllBudget);

    // Province
    var queryString = encodeURIComponent("select A, E");
    var query = new google.visualization.Query(budget_url + queryString );
    query.send(drawLineProvince);

    var queryString = encodeURIComponent("select H, I");
    var query = new google.visualization.Query(descriptive_url + queryString );
    query.send(drawPieProvince);

    var queryString = encodeURIComponent("select A, F, G, H, I, J, K, L, M, N, O");
    var query = new google.visualization.Query(budget_url + queryString );
    query.send(drawLineAllProvince);
}

function errorGen(res) {
    alert(
        "Error in query: " +
        res.getMessage() +
        " " +
        res.getDetailedMessage()
    );
}

function drawLineAllBudget(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();

    var options = {
        title: "งบประมาณรายปี",
        subtitle : "หน่วย บาท",
        vAxis:{
            title: 'งบประมาณ'
        },
        hAxis: {
            title: 'ปี'
        },
    };

    var chart = new google.charts.Line(
        document.getElementById("line_all_budget")
    );
    chart.draw(data, google.charts.Line.convertOptions(options));
}

function drawPieAllBudget(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    // data.sort({column: 1, desc: true});
    var options = {
        title: "สัดส่วนการจัดสรรงบประมาณแต่ละส่วน",
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie_all_budget'));
    chart.draw(data, options);
}

function drawLineProvince(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();

    var options = {
        title: "งบประมาณรวมของจังหวัดทั้งหมด",
        subtitle : "หน่วย บาท",
        vAxis:{
            title: 'งบประมาณ'
        },
        hAxis: {
            title: 'ปี'
        },
    };

    var chart = new google.charts.Line(
        document.getElementById("line_province")
    );
    chart.draw(data, google.charts.Line.convertOptions(options));
}

function drawPieProvince(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();
    // data.sort({column: 1, desc: true});
    var options = {
        title: "สัดส่วนการจัดสรรงบประมาณแต่ละส่วน",
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie_province'));
    chart.draw(data, options);
}


function drawLineAllProvince(response) {
    if (response.isError()) {
        errorAlert(response);
        return;
    }

    var data = response.getDataTable();

    var options = {
        title: "งบประมาณรวมของจังหวัดทั้งหมด",
        subtitle : "หน่วย บาท",
        vAxis:{
            title: 'งบประมาณ'
        },
        hAxis: {
            title: 'ปี'
        },
    };

    var chart = new google.charts.Line(
        document.getElementById("line_all_province")
    );
    chart.draw(data, google.charts.Line.convertOptions(options));
}
