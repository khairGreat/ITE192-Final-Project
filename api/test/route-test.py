from unittest.mock import patch
from fastapi.testclient import TestClient
import main 


test = TestClient(main.app)

@patch('main.is_connected')
def test_root_connected(mock_is_connected):
    mock_is_connected.return_value = True

    response = test.get('/')
    assert response.status_code == 200
    assert response.json() == {"is_connected": True}