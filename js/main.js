const list_songs = function() {
    let leftList = document.querySelector("#left-list");
    let rightList = document.querySelector("#right-list");
    for (let i = 0; i < HILTONES_INDEX.length; i++) {
        if (i%2 == 0) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = "play.html?song=" + HILTONES_INDEX[i];
            a.innerHTML = HILTONES_INDEX[i];
            li.appendChild(a);
            leftList.append(li);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let title = JSON.parse(this.responseText)['title'];
                        a.innerHTML = title;
                }
            };
            xhttp.open("GET",
                 BASE_URL + HILTONES_INDEX[i], true);
            xhttp.send();
        }
    }
    for (let i = 0; i < HILTONES_INDEX.length; i++) {
        if (i%2 == 1) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = "play.html?song=" + HILTONES_INDEX[i];
            a.innerHTML = HILTONES_INDEX[i];
            li.appendChild(a);
            rightList.append(li);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let title = JSON.parse(this.responseText)['title'];
                        a.innerHTML = title;
                }
            };
            xhttp.open("GET",
                 BASE_URL + HILTONES_INDEX[i], true);
            xhttp.send();
        }
    }
}

document.addEventListener('DOMContentLoaded', list_songs);