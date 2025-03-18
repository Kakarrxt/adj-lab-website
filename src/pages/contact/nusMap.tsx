"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"

interface MapOverlayStyles {
  font: string
  position: "absolute"
  width: string
  top: string
  left: string
  padding: string
  transition: string
  transform: string
  zIndex: number
}

interface MapOverlayInnerStyles {
  backgroundColor: string
  boxShadow: string
  borderRadius: string
  padding: string
  marginBottom: string
}

interface ToggleButtonStyles {
  position: "absolute"
  left: string
  top: string
  zIndex: number
  backgroundColor: string
  border: string
  borderRadius: string
  padding: string
  cursor: string
  boxShadow: string
  display: string
  alignItems: string
  justifyContent: string
  width: string
  height: string
}

interface FieldsetStyles {
  display: string
  justifyContent?: string
  border: string
}

interface LabelStyles {
  fontWeight: string
  marginRight?: string
  display?: string
  marginBottom?: string
}

interface SelectStyles {
  width: string
}

type LightPreset = "dawn" | "day" | "dusk" | "night"

const NUSMapbox: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  const [lightPreset, setLightPreset] = useState<LightPreset>("day")
  const [showPlaceLabels, setShowPlaceLabels] = useState<boolean>(true)
  const [showPOILabels, setShowPOILabels] = useState<boolean>(true)
  const [showRoadLabels, setShowRoadLabels] = useState<boolean>(true)
  const [showTransitLabels, setShowTransitLabels] = useState<boolean>(true)
  const [styleLoaded, setStyleLoaded] = useState<boolean>(false)
  const [controlsVisible, setControlsVisible] = useState<boolean>(false)

  // MD6 Building coordinates
  const md6Coordinates: [number, number] = [103.78204, 1.29477]

  // Function to apply map settings based on current state
  const applyMapSettings = () => {
    if (!mapRef.current || !styleLoaded) return

    const map = mapRef.current

    // Apply light preset - fixing previous issue
    try {
      // Different approach to set light properties based on preset
      const lightSettings = {
        dawn: { color: "#ffedcc", intensity: 0.5, position: [1.15, 210, 30] as [number, number, number] },
        day: { color: "#ffffff", intensity: 0.8, position: [1.15, 210, 70] as [number, number, number] },
        dusk: { color: "#ffd6a0", intensity: 0.4, position: [1.15, 210, 20] as [number, number, number] },
        night: { color: "#004488", intensity: 0.2, position: [1.15, 210, 30] as [number, number, number] },
      }

      const currentLight = lightSettings[lightPreset]

      map.setLight({
        color: currentLight.color,
        intensity: currentLight.intensity,
        position: currentLight.position,
      })

      // Also change the sky color based on time of day
      const skyColors = {
        dawn: "#fce8c9",
        day: "#87ceeb",
        dusk: "#f08a46",
        night: "#04041c",
      }

      if (map.getLayer("sky")) {
        map.setPaintProperty("sky", "sky-atmosphere-color", skyColors[lightPreset])
      } else if (map.getStyle()?.layers) {  // Fixed: Added optional chaining
        // Add sky layer if supported and not already present
        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-color": skyColors[lightPreset],
          },
        })
      }
    } catch (error) {
      console.error("Error applying light preset:", error)
    }

    // Apply label visibility settings - FIX: Check if layers exist before setting properties
    try {
      // Get all available layers
      const style = map.getStyle()
      const layers = style?.layers || []  // Fixed: Added optional chaining and default empty array
      const layerIds = layers.map((layer) => layer.id)

      // Helper function to safely set layer visibility
      const safeSetVisibility = (layerId: string, visibility: "visible" | "none") => {
        if (layerId.includes("*")) {
          // Handle wildcard pattern matching
          const pattern = new RegExp(layerId.replace("*", ".*"))
          layerIds.forEach((id) => {
            if (pattern.test(id)) {
              map.setLayoutProperty(id, "visibility", visibility)
            }
          })
        } else if (layerIds.includes(layerId)) {
          map.setLayoutProperty(layerId, "visibility", visibility)
        }
      }

      // Try multiple possible layer naming patterns for each category
      if (showPlaceLabels) {
        ;["country-label", "settlement-label", "state-label", "place-label", "country-*", "place-*"].forEach((layer) =>
          safeSetVisibility(layer, "visible"),
        )
      } else {
        ;["country-label", "settlement-label", "state-label", "place-label", "country-*", "place-*"].forEach((layer) =>
          safeSetVisibility(layer, "none"),
        )
      }

      if (showPOILabels) {
        ;["poi-label", "poi-*"].forEach((layer) => safeSetVisibility(layer, "visible"))
      } else {
        ;["poi-label", "poi-*"].forEach((layer) => safeSetVisibility(layer, "none"))
      }

      if (showRoadLabels) {
        ;["road-label", "road-*-label", "road-name-*"].forEach((layer) => safeSetVisibility(layer, "visible"))
      } else {
        ;["road-label", "road-*-label", "road-name-*"].forEach((layer) => safeSetVisibility(layer, "none"))
      }

      if (showTransitLabels) {
        ;["transit-label", "transit-*"].forEach((layer) => safeSetVisibility(layer, "visible"))
      } else {
        ;["transit-label", "transit-*"].forEach((layer) => safeSetVisibility(layer, "none"))
      }
    } catch (error) {
      console.error("Error applying label visibility:", error)
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    // FIX: Check if Mapbox token is valid and handle potential errors
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYWJoaTAzMDUiLCJhIjoiY204ZXBvN2wzMDN4MzJucHo2c3Z2eDhvaCJ9.MV8dl7KGvkWx_m8H5xzWvA"
    }

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: md6Coordinates,
        zoom: 17.5,
        pitch: 60,
        bearing: 30,
        style: "mapbox://styles/mapbox/streets-v12",
        // FIX: Add error handling for map initialization
        transformRequest: (url, resourceType) => {
          console.log(`Loading ${resourceType} from ${url}`)
          return { url }
        },
      })

      // FIX: Add error handling for map
      mapRef.current.on("error", (e) => {
        console.error("Mapbox error:", e.error)
      })

      mapRef.current.on("style.load", () => {
        setStyleLoaded(true)

        const map = mapRef.current
        if (!map) return

        // Add NUS boundary path
        map.addSource("nus-path", {
          type: "geojson",
          lineMetrics: true,
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [103.7697, 1.2925], // Engineering
                [103.7742, 1.2925], // Business School
                [103.7785, 1.2964], // Science
                [103.7724, 1.2962], // Central Library
                [103.7697, 1.2925], // Back to Engineering to close the loop
              ],
            },
          },
        })

        map.addLayer({
          id: "nus-boundary",
          source: "nus-path",
          type: "line",
          paint: {
            "line-width": 4,
            "line-color": "#FF0000",
            "line-opacity": 0.8,
          },
        })

        // Add MD6 Building polygon
        map.addSource("md6-building", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [103.78174, 1.29457],
                  [103.78234, 1.29457],
                  [103.78234, 1.29497],
                  [103.78174, 1.29497],
                  [103.78174, 1.29457],
                ],
              ],
            },
          },
        })

        // Add MD6 Building as a highlighted polygon
        map.addLayer({
          id: "md6-building-highlight",
          type: "fill-extrusion",
          source: "md6-building",
          paint: {
            "fill-extrusion-color": "#FF8C00", // Orange color
            "fill-extrusion-height": 30, // Approximate height
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.8,
          },
        })

        // Add a stronger outline to the MD6 building
        map.addLayer({
          id: "md6-building-outline",
          type: "line",
          source: "md6-building",
          paint: {
            "line-color": "#FF4500", // Bright orange-red for outline
            "line-width": 3,
            "line-opacity": 1,
          },
        })

        // Add key NUS landmarks
        const landmarks = [
          { name: "UTown", coordinates: [103.7741, 1.3039], color: "#FF0000" },
          { name: "Faculty of Engineering", coordinates: [103.7697, 1.2925], color: "#0000FF" },
          { name: "Science Faculty", coordinates: [103.7785, 1.2964], color: "#00FF00" },
          { name: "Biz School", coordinates: [103.7742, 1.2925], color: "#FFFF00" },
          { name: "NUS Central Library", coordinates: [103.7724, 1.2962], color: "#FF00FF" },
          { name: "ADJ Lab (MD6)", coordinates: md6Coordinates, color: "#FF8C00" },
        ]

        landmarks.forEach((landmark) => {
          // Create a marker element
          const el = document.createElement("div")
          el.className = "marker"
          el.style.backgroundColor = landmark.color
          el.style.width = "15px"
          el.style.height = "15px"
          el.style.borderRadius = "50%"
          el.style.border = "2px solid white"
          el.style.boxShadow = "0 0 2px rgba(0,0,0,0.5)"

          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(landmark.name)

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(landmark.coordinates as [number, number])
            .setPopup(popup)
            .addTo(map)
        })

        // FIX: Check if composite source exists before adding 3D buildings layer
        try {
          // Fixed: Proper null checks
          if (map.getSource("composite") && !map.getLayer("3d-buildings")) {
            map.addLayer({
              id: "3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 13,
              paint: {
                "fill-extrusion-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "height"],
                  0,
                  "#DCE1E5",
                  20,
                  "#BBCAD6",
                  40,
                  "#9BB3C7",
                  60,
                  "#7B9CB8",
                  80,
                  "#5B85A9",
                  100,
                  "#3B6E9A",
                ],
                "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 13, 0, 14, ["get", "height"]],
                "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 13, 0, 14, ["get", "min_height"]],
                "fill-extrusion-opacity": 0.6,
              },
            })
          }
        } catch (error) {
          console.error("Error adding 3D buildings layer:", error)
        }

        // Apply initial light preset and label settings
        applyMapSettings()
      })

      // Add navigation controls
      mapRef.current.addControl(new mapboxgl.NavigationControl())
    } catch (error) {
      console.error("Error initializing map:", error)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update map settings when state changes
  useEffect(() => {
    applyMapSettings()
  }, [lightPreset, showPlaceLabels, showPOILabels, showRoadLabels, showTransitLabels, styleLoaded])

  const toggleControls = () => {
    setControlsVisible(!controlsVisible)
  }

  const mapOverlayStyle: MapOverlayStyles = {
    font: "12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif",
    position: "absolute",
    width: "200px",
    top: "10px",
    left: "10px",
    padding: "0",
    transition: "transform 0.3s ease-in-out",
    transform: controlsVisible ? "translateX(0)" : "translateX(-220px)",
    zIndex: 1,
  }

  const toggleButtonStyle: ToggleButtonStyles = {
    position: "absolute",
    left: controlsVisible ? "220px" : "10px",
    top: "10px",
    zIndex: 2,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
  }

  const mapOverlayInnerStyle: MapOverlayInnerStyles = {
    backgroundColor: "#fff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "3px",
    padding: "10px",
    marginBottom: "10px",
  }

  const fieldsetStyle: FieldsetStyles = {
    display: "flex",
    justifyContent: "space-between",
    border: "none",
  }

  const labelStyle: LabelStyles = {
    fontWeight: "bold",
    marginRight: "10px",
  }

  const selectFieldsetStyle: FieldsetStyles = {
    display: "block",
    border: "none",
  }

  const selectLabelStyle: LabelStyles = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  }

  const selectStyle: SelectStyles = {
    width: "100%",
  }

  return (
    <>
      {/* FIX: Add a container with defined height */}
      <div style={{ position: "relative", width: "100%", height: "500px" }}>
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

        {/* Toggle Button */}
        <button
          onClick={toggleControls}
          style={toggleButtonStyle}
          aria-label={controlsVisible ? "Hide controls" : "Show controls"}
        >
          {controlsVisible ? "←" : "→"}
        </button>

        {/* Controls Panel */}
        <div className="map-overlay" style={mapOverlayStyle}>
          <div className="map-overlay-inner" style={mapOverlayInnerStyle}>
            <h3 style={{ margin: "0 0 10px 0" }}>NUS Singapore Map Controls</h3>
            <fieldset className="select-fieldset" style={selectFieldsetStyle}>
              <label style={selectLabelStyle}>
                Select light preset
                <select
                  id="lightPreset"
                  name="lightPreset"
                  value={lightPreset}
                  onChange={(e) => setLightPreset(e.target.value as LightPreset)}
                  style={selectStyle}
                >
                  <option value="dawn">Dawn</option>
                  <option value="day">Day</option>
                  <option value="dusk">Dusk</option>
                  <option value="night">Night</option>
                </select>
              </label>
            </fieldset>
            <fieldset style={fieldsetStyle}>
              <label style={labelStyle}>
                Show place labels
                <input
                  type="checkbox"
                  id="showPlaceLabels"
                  checked={showPlaceLabels}
                  onChange={(e) => setShowPlaceLabels(e.target.checked)}
                />
              </label>
            </fieldset>
            <fieldset style={fieldsetStyle}>
              <label style={labelStyle}>
                Show POI labels
                <input
                  type="checkbox"
                  id="showPointOfInterestLabels"
                  checked={showPOILabels}
                  onChange={(e) => setShowPOILabels(e.target.checked)}
                />
              </label>
            </fieldset>
            <fieldset style={fieldsetStyle}>
              <label style={labelStyle}>
                Show road labels
                <input
                  type="checkbox"
                  id="showRoadLabels"
                  checked={showRoadLabels}
                  onChange={(e) => setShowRoadLabels(e.target.checked)}
                />
              </label>
            </fieldset>
            <fieldset style={fieldsetStyle}>
              <label style={labelStyle}>
                Show transit labels
                <input
                  type="checkbox"
                  id="showTransitLabels"
                  checked={showTransitLabels}
                  onChange={(e) => setShowTransitLabels(e.target.checked)}
                />
              </label>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
}

export default NUSMapbox