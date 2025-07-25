'use client';
import { useState, useEffect, useCallback } from 'react';
import IncidentCard from './IncidentCard';

function getTypeIcon(type) {
    switch (type) {
        case 'Unauthorised Access':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16">
                    <path fill="yellow" d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1s.5.448.5 1s-.224 1-.5 1" />
                </svg>
            );
        case 'Gun Threat':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                    <path fill="orange" d="M7 5h16v4h-1v1h-6a1 1 0 0 0-1 1v1a2 2 0 0 1-2 2H9.62c-.38 0-.73.22-.9.56l-2.45 4.89c-.17.34-.51.55-.89.55H2s-3 0 1-6c0 0 3-4-1-4V5h1l.5-1h3zm7 7v-1a1 1 0 0 0-1-1h-1s-1 1 0 2a2 2 0 0 1-2-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1" />
                </svg>
            );
        case 'Face Recognised':
            return (
               <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.5 8.187c.104-2.1.415-3.41 1.347-4.34c.93-.932 2.24-1.243 4.34-1.347M21.5 8.187c-.104-2.1-.415-3.41-1.347-4.34c-.93-.932-2.24-1.243-4.34-1.347m0 19c2.1-.104 3.41-.415 4.34-1.347c.932-.93 1.243-2.24 1.347-4.34M8.187 21.5c-2.1-.104-3.41-.415-4.34-1.347c-.932-.93-1.243-2.24-1.347-4.34M17.5 17l-.202-.849a2 2 0 0 0-1.392-1.458l-2.406-.694v-1.467c.896-.605 1.5-1.736 1.5-3.032C15 7.567 13.656 6 12 6c-1.657 0-3 1.567-3 3.5c0 1.296.603 2.427 1.5 3.032v1.467l-2.391.7a2 2 0 0 0-1.371 1.406L6.5 17"
                  />
                </svg>

            );
        case 'Theft':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                  <path fill="red" d="m13.5 22.5l-2-.4l.8-4.3l-3.6-2.7l-1.3-5.7l-2.2 1.9l.8 3.8l-2 .4l-1-4.9l4.45-3.975q.575-.5 1.363-.412t1.512.387q.8.35 1.663.5t1.737.025t1.613-.575t1.412-1L18 7.1q-.75.575-1.55 1.075t-1.725.775q-.825.225-1.662.238T11.4 9l.7 3.1l3.7-.7l5.2 3.7l-1.2 1.6l-4.3-3l-3.6.7l2.7 2zM8 5.5q-.825 0-1.412-.587T6 3.5t.588-1.412T8 1.5t1.413.588T10 3.5t-.587 1.413T8 5.5"/>
                </svg>

            );
        case 'Vandalism':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 14 14">
                  <path fill="green" fillRule="evenodd" d="M13.985.603a.75.75 0 0 1-.588.882l-5 1a.75.75 0 0 1-.294-1.47l5-1a.75.75 0 0 1 .882.588M4.25 3.25h.25a.75.75 0 0 0 0-1.5h-2a.75.75 0 1 0 0 1.5h.25V4.5H1.5A1.5 1.5 0 0 0 0 6v6.5A1.5 1.5 0 0 0 1.5 14h4A1.5 1.5 0 0 0 7 12.5V6a1.5 1.5 0 0 0-1.5-1.5H4.25zm4.147-.235a.75.75 0 0 0-.294 1.47l5 1a.75.75 0 1 0 .294-1.47z" clipRule="evenodd"/>
                </svg>

            );
        default:
            return null;
    }
}

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [resolvedIncidentsCount, setResolvedIncidentsCount] = useState(0);

    const fetchIncidents = useCallback(async () => {
        try {
            const unresolvedRes = await fetch('/api/incidents?resolved=false');
            const unresolvedData = await unresolvedRes.json();

            if (!Array.isArray(unresolvedData.incidents)) {
                console.error('API did not return an array for unresolved incidents:', unresolvedData);
                setIncidents([]);
                return;
            }

            const transformedUnresolved = unresolvedData.incidents.map((item) => ({
                id: item.id,
                type: item.type,
                typeIcon: getTypeIcon(item.type),
                camera: item.camera
                ? `${item.camera.location} (${item.camera.name})`
                : 'Unknown Camera',
                start: new Date(item.tsStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                end: new Date(item.tsEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date(item.tsStart).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                image: item.thumbnailUrl,
                resolved: item.resolved,
            }));
            setIncidents(transformedUnresolved);

            const resolvedRes = await fetch('/api/incidents?resolved=true');
            const resolvedData = await resolvedRes.json();

            if (Array.isArray(resolvedData.incidents)) {
                setResolvedIncidentsCount(resolvedData.incidents.length);
            } else {
                console.warn('API did not return an array for resolved incidents:', resolvedData);
                setResolvedIncidentsCount(0);
            }

        } catch (error) {
            console.error('Failed to fetch incidents:', error);
            setIncidents([]);
            setResolvedIncidentsCount(0);
        }
    }, []);

    useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

   const handleResolve = async (incidentId) => {
  try {
    const res = await fetch(`/api/incidents/${incidentId}/resolve`, {
      method: 'PATCH',
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Resolve API error:', errorData);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Remove resolved incident from UI
    setIncidents(prev => prev.filter(inc => inc.id !== incidentId));

  } catch (error) {
    console.error('Failed to resolve incident:', error);
    alert('Failed to resolve incident');
  }
};

    return (
        <div className="bg-gray-800 border-2 border-gray-700 p-4 rounded-lg shadow-md overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                    <span className="text-red-500">⚠</span> {incidents.length} Unresolved Incidents
                </h2>
                <button className="flex items-baseline bg-black/60 rounded-2xl px-2 text-xs text-white border-1 border-gray-600 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16">
                        <path
                            fill="none"
                            stroke="green"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="m1.75 9.75 2.5 2.5m3.5-4 2.5-2.5m-4.5 4 2.5 2.5 6-6.5"
                        />
                    </svg>
                    <span className="px-2 py-1 rounded">{resolvedIncidentsCount} resolved incidents</span>
                </button>
            </div>

            <div className="space-y-4">
                {incidents.length > 0 ? (
                    incidents.map((incident) => (
                        <IncidentCard
                            key={incident.id}
                            incident={incident}
                            onResolve={handleResolve}
                        />
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No unresolved incidents found.</p>
                )}
            </div>
        </div>
    );
};

export default IncidentList;
