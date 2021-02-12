MyGame.model.Collision = function(){


    function objectCollision(playerRadius, playerCenter, rectangle){
        // rectangle{center{x, y}, size{x, y}
        let circle = {center:playerCenter, radius: playerRadius}
        let startx = rectangle.center.x - rectangle.size.x/2;
        let starty = rectangle.center.y - rectangle.size.y/2;
        pt1 = {x:startx, y:starty};
        pt2 = {x:startx + rectangle.size.x, y:starty};
        pt3 = {x:startx + rectangle.size.x,y:starty + rectangle.size.y}
        pt4 = {x:startx, y:starty + rectangle.size.y};


        if(lineCircleIntersection(pt1,pt2,circle)){
            return true;
        }
        if(lineCircleIntersection(pt2,pt3,circle)){
            return true;
        }
        if(lineCircleIntersection(pt3,pt4,circle)){
            return true;
        }
        if(lineCircleIntersection(pt4,pt1,circle)){
            return true;
        }
        
        return false;
    }

    function objectLineCollision(playerRadius, playerCenter, line){
        let circle = {center:playerCenter, radius: playerRadius}
        if(lineCircleIntersection(line.pt1, line.pt2,circle)){
            return true;
        }
        else{
            return false;
        }
    }

    function objectInsideRect(playerCenter,rectangle){
        let startx = rectangle.center.x - rectangle.size.x/2;
        let starty = rectangle.center.y - rectangle.size.y/2;
        pt1 = {x:startx, y:starty};
        pt2 = {x:startx + rectangle.size.x,y:starty + rectangle.size.y}
        if(playerCenter.x > pt1.x && playerCenter.x < pt2.x && playerCenter.y > pt1.y && playerCenter.y < pt2.y ){
            return true;
        }
        else{
            return false;
        }
    }

    

    // Checking intersecting of frog and car
    // Reference: https://stackoverflow.com/questions/37224912/circle-line-segment-collision
    function lineCircleIntersection(pt1, pt2, circle) {
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
        let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
        let b = -2 * (v1.x * v2.x + v1.y * v2.y);
        let c =  2 * (v1.x * v1.x + v1.y * v1.y);
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if (isNaN(d)) { // no intercept
            return false;
        }
        // These represent the unit distance of point one and two on the line
        let u1 = (b - d) / c;  
        let u2 = (b + d) / c;
        if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
            return true;
        }
        if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
            return true;
        }
        return false;
    }


    let api = {
        objectCollision: objectCollision,
        objectInsideRect: objectInsideRect,
        objectLineCollision: objectLineCollision,
    }

    return api;

}