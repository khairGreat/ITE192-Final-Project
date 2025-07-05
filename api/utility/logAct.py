from datetime import datetime

def log_act(message : str) :
    today =  datetime.today()
    print("\n=============================================================")
    print(f'message: {message}')
    print(f"timestamp: {today}")
    print("=============================================================\n")  