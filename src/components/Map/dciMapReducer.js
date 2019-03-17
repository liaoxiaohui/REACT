//Actions
const INIT_MAP = 'INIT_MAP';
const SET_CURRENT_SCALE = 'SET_CURRENT_SCALE';
const SET_CURRENT_BASEMAP = 'SET_CURRENT_BASEMAP';

//Action Creators
export const setBaseMap = (mapId, basemap) => {
    return {
        type: SET_CURRENT_BASEMAP,
        payload: {mapId, basemap }
    };
};

export const initialMap = (view, mapId) => {
    return function(dispatch) {
        view.when(() => {
            dispatch({
                type: INIT_MAP,
                payload: { view, mapId }
            });

            dispatchScaleChange(dispatch, view.scale, mapId);

            view.watch('scale', newScale => {
                dispatchScaleChange(dispatch, newScale, mapId);
            });
        })
    };
};

export const delAction = ()=>{
    return{
        type:DEL_ACTIIONS,
        payload:{}
    }
}

const debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const dispatchScaleChange = debounce(function(dispatch, newScale, mapId) {
    dispatch({
        type: SET_CURRENT_SCALE,
        payload: { scale: newScale, mapId }
    });
}, 250);

//Reducer
const initialState = {
    views: {},
    scales: {},
    basemaps: {},
    visualresults:{},
};

const createReducer = (initialState, reducerMap) => {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer ? reducer(state, action.payload) : state;
    };
};

export const mapConfig = createReducer(initialState, {
    [INIT_MAP]: (state, payload) => {
        let views = Object.assign({}, state.views);
        views[payload.mapId] = payload.view;
        return Object.assign({}, state, {views: views});
    },
    [SET_CURRENT_SCALE]: (state, payload) => {
        let scales = Object.assign({}, state.scales);
        scales[payload.mapId] = payload.scale;
        return Object.assign({}, state, {scales: scales});
    },
    [SET_CURRENT_BASEMAP]: (state, payload) => {
         let basemaps = Object.assign({}, state.basemaps);
        basemaps[payload.mapId] = payload.basemap;
         return Object.assign({}, state, {basemaps: basemaps});
    }
});
